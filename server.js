/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'db.json');

const app = express();
app.use(express.json());
app.use(cors());

let db = {};

const loadDb = async () => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        db = JSON.parse(data);
        console.log('Database loaded successfully');
    } catch (err) {
        console.error('Error loading database:', err);
        db = {
            users: [],
            clients: [],
            projects: [],
            timeEntries: [],
            invoices: [],
            expenses: [],
            categories: []
        };
        await saveDb();
    }
};

const saveDb = async () => {
    try {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error saving database:', err);
        return false;
    }
};


const authenticateToken = (req, res, next) => {
    if (req.path === '/login' || req.path === '/register' || req.method === 'GET') {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        const user = db.users.find(u => u.token === token);

        if (user) {
            req.user = user;
            return next();
        }
    }

    return res.status(401).json({ message: 'Unauthorized' });
};

app.use(authenticateToken);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
        token: user.token,
        user: { id: user.id, name: user.name, email: user.email }
    });
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        hourlyRate: 75,
        currency: "USD",
        preferences: {
            theme: "light",
            invoicePrefix: "INV-"
        },
        token: `simulated_jwt_token_${Date.now()}`
    };

    db.users.push(newUser);
    await saveDb();

    return res.status(201).json({
        token: newUser.token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});

// New endpoint to get current user profile
app.get('/user/profile', (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const user = db.users.find(u => u.token === token);

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    const { password, ...userData } = user;
    res.json(userData);
});

app.put('/user/profile', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const userIndex = db.users.findIndex(u => u.token === token);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { email, password, token: newToken, id, ...updatableFields } = req.body;

    db.users[userIndex] = {
        ...db.users[userIndex],
        ...updatableFields
    };

    await saveDb();

    const { ...userData } = db.users[userIndex];
    res.json(userData);
});

app.get('/clients', (req, res) => {
    res.json(db.clients || []);
});

app.get('/clients/:id', (req, res) => {
    const client = db.clients.find(c => c.id === parseInt(req.params.id));
    if (client) {
        res.json(client);
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
});

app.post('/clients', async (req, res) => {
    const newClient = {
        id: Date.now(),
        ...req.body,
        userId: req.user?.id
    };

    db.clients.push(newClient);
    await saveDb();

    res.status(201).json(newClient);
});

app.put('/clients/:id', async (req, res) => {
    const clientIndex = db.clients.findIndex(c => c.id === parseInt(req.params.id));

    if (clientIndex !== -1) {
        db.clients[clientIndex] = { ...db.clients[clientIndex], ...req.body };
        await saveDb();
        res.json(db.clients[clientIndex]);
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
});

app.delete('/clients/:id', async (req, res) => {
    const clientIndex = db.clients.findIndex(c => c.id === parseInt(req.params.id));

    if (clientIndex !== -1) {
        db.clients.splice(clientIndex, 1);
        await saveDb();
        res.json({ message: 'Client deleted successfully' });
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
});

app.get('/projects', (req, res) => {
    res.json(db.projects || []);
});

app.get('/projects/:id', (req, res) => {
    const project = db.projects.find(p => p.id === parseInt(req.params.id));
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

app.post('/projects', async (req, res) => {
    const newProject = {
        id: Date.now(),
        ...req.body,
        status: req.body.status || 'In Progress',
        userId: req.user?.id,
    };

    db.projects.push(newProject);
    await saveDb();

    res.status(201).json(newProject);
});

app.put('/projects/:id', async (req, res) => {
    const projectIndex = db.projects.findIndex(p => p.id === parseInt(req.params.id));

    if (projectIndex !== -1) {
        db.projects[projectIndex] = { ...db.projects[projectIndex], ...req.body };
        await saveDb();
        res.json(db.projects[projectIndex]);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

app.delete('/projects/:id', async (req, res) => {
    const projectIndex = db.projects.findIndex(p => p.id === parseInt(req.params.id));

    if (projectIndex !== -1) {
        db.projects.splice(projectIndex, 1);
        await saveDb();
        res.json({ message: 'Project deleted successfully' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

app.get('/timeEntries', (req, res) => {
    res.json(db.timeEntries || []);
});

app.get('/timeEntries/:id', (req, res) => {
    const timeEntry = db.timeEntries.find(entry => entry.id === parseInt(req.params.id))
    if (timeEntry) {
        res.json(timeEntry)
    } else {
        res.status(404).json({ message: 'Time entry not found' })
    }
})

app.put('/timeEntries/:id', async (req, res) => {
    const entryIndex = db.timeEntries.findIndex(entry => entry.id === parseInt(req.params.id))

    if (entryIndex !== -1) {
        db.timeEntries[entryIndex] = { ...db.timeEntries[entryIndex], ...req.body }
        await saveDb()
        res.json(db.timeEntries[entryIndex])
    } else {
        res.status(404).json({ message: 'Time entry not found' })
    }
})

app.delete('/timeEntries/:id', async (req, res) => {
    const entryIndex = db.timeEntries.findIndex(entry => entry.id === parseInt(req.params.id))

    if (entryIndex !== -1) {
        db.timeEntries.splice(entryIndex, 1)
        await saveDb()
        res.json({ message: 'Time entry deleted successfully' })
    } else {
        res.status(404).json({ message: 'Time entry not found' })
    }
})

app.post('/timeEntries', async (req, res) => {
    const newTimeEntry = {
        id: Date.now(),
        ...req.body,
        userId: req.user?.id,
    };

    db.timeEntries.push(newTimeEntry);
    await saveDb();

    res.status(201).json(newTimeEntry);
});

app.get('/invoices', (req, res) => {
    res.json(db.invoices || []);
});

app.post('/invoices', async (req, res) => {
    const newInvoice = {
        id: Date.now(),
        number: `${req.user?.preferences?.invoicePrefix || 'INV-'}${Date.now()}`,
        ...req.body,
        userId: req.user?.id
    };

    db.invoices.push(newInvoice);
    await saveDb();

    res.status(201).json(newInvoice);
});

await loadDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});