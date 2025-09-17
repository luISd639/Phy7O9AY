// 代码生成时间: 2025-09-17 19:55:33
import express from 'express';
import os from 'os';
import { CPUInfo, MemInfo } from 'os-utils';
import { promisify } from 'util';

// Constants
const CPU_INFO = 'CPUInfo';
const MEM_INFO = 'MemInfo';

// Promisify the CPUInfo and MemInfo functions for async use
const getCpuInfo = promisify(CPUInfo);
const getMemInfo = promisify(MemInfo);

// Define the Express app
const app = express();
app.use(express.json());

// Endpoint to get CPU information
app.get('/api/cpu', async (req, res) => {
    try {
        const cpuInfo = await getCpuInfo();
        res.status(200).json(cpuInfo);
    } catch (error) {
        console.error('Failed to fetch CPU info:', error);
        res.status(500).json({ error: 'Failed to fetch CPU info' });
    }
});

// Endpoint to get Memory information
app.get('/api/mem', async (req, res) => {
    try {
        const memInfo = await getMemInfo();
        res.status(200).json(memInfo);
    } catch (error) {
        console.error('Failed to fetch Memory info:', error);
        res.status(500).json({ error: 'Failed to fetch Memory info' });
    }
});

// Endpoint to get system uptime
app.get('/api/uptime', (req, res) => {
    const uptime = os.uptime();
    res.status(200).json({ uptime });
});

// Endpoint to get system load averages
app.get('/api/load', (req, res) => {
    const loadavg = os.loadavg();
    res.status(200).json({ loadavg });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`System Performance Monitor is running on port ${PORT}`);
});

// Documentation:
/**
 * This module provides a RESTful API for system performance monitoring
 * using the Express framework and os-utils library.
 * It offers endpoints to fetch CPU and Memory usage, system uptime,
 * and load averages.
 */