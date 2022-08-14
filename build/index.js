"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ink = __importStar(require("ink"));
const React = __importStar(require("react"));
const si = __importStar(require("systeminformation"));
const App = () => {
    // Source https://stackoverflow.com/a/18650828
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    const [OS, setOS] = React.useState('N/A');
    const [kernel, setKernel] = React.useState('N/A');
    const [host, setHost] = React.useState('N/A');
    const [shell, setShell] = React.useState('N/A');
    const [resolution, setResolution] = React.useState('N/A');
    const [CPU, setCPU] = React.useState('N/A');
    const [GPU, setGPU] = React.useState('N/A');
    const [RAM, setRAM] = React.useState('N/A');
    const [logo, setLogo] = React.useState('');
    const sysinfo = {
        OS,
        kernel,
        host,
        shell,
        resolution,
        CPU,
        GPU,
        RAM,
        logo
    };
    si.osInfo().then(data => {
        setOS(data.distro);
        setKernel(data.kernel);
        setHost(data.hostname);
        setLogo(data.logofile);
    })
        .catch(e => console.log(e));
    si.shell().then(data => setShell(data))
        .catch(e => console.log(e));
    si.graphics().then(data => setResolution(`${data.displays[0].resolutionX}x${data.displays[0].resolutionY}`))
        .catch(e => console.log(e));
    si.cpu().then(data => setCPU(`${data.manufacturer} ${data.brand} ${data.speed}`))
        .catch(e => console.log(e));
    si.graphics().then(data => setGPU(`${data.controllers[0].vendor} ${data.controllers[0].model}`))
        .catch(e => console.log(e));
    si.mem().then(data => setRAM(`${formatBytes(data.free)}/${formatBytes(data.total)}`))
        .catch(e => console.log(e));
    return (React.createElement(Ink.Box, { flexDirection: 'row', paddingTop: 1 },
        React.createElement(Ink.Box, { paddingRight: 2 },
            React.createElement(Ink.Text, null, sysinfo.logo)),
        React.createElement(Ink.Box, { flexDirection: 'column' },
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "OS: "),
                React.createElement(Ink.Text, null, sysinfo.OS)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "Host: "),
                React.createElement(Ink.Text, null, sysinfo.host)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "Kernel: "),
                React.createElement(Ink.Text, null, sysinfo.kernel)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "Shell: "),
                React.createElement(Ink.Text, null, sysinfo.shell)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "Resolution: "),
                React.createElement(Ink.Text, null, sysinfo.resolution)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "CPU: "),
                React.createElement(Ink.Text, null, sysinfo.CPU)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "GPU: "),
                React.createElement(Ink.Text, null, sysinfo.GPU)),
            React.createElement(Ink.Box, { flexDirection: 'row' },
                React.createElement(Ink.Text, { color: 'blueBright' }, "RAM: "),
                React.createElement(Ink.Text, null, sysinfo.RAM)))));
};
Ink.render(React.createElement(App, null));
