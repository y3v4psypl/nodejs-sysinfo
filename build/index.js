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
const logos_1 = require("./logos");
const App = () => {
    const [OS, setOS] = React.useState('N/A');
    const [kernel, setKernel] = React.useState('N/A');
    const [host, setHost] = React.useState('N/A');
    const [shell, setShell] = React.useState('N/A');
    const [resolution, setResolution] = React.useState(['N/A']);
    const [CPU, setCPU] = React.useState('N/A');
    const [GPU, setGPU] = React.useState(['N/A']);
    const [RAM, setRAM] = React.useState('N/A');
    const [logo, setLogo] = React.useState('N/A');
    const [battery, setBattery] = React.useState('N/A');
    const [uptime, setUptime] = React.useState('N/A');
    const sysinfo = {
        OS,
        kernel,
        host,
        shell,
        resolution,
        battery,
        CPU,
        GPU,
        RAM,
        uptime,
        logo,
    };
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
    const getLogo = () => {
        switch (logo) {
            case 'debian':
            case 'gentoo':
            case 'mint':
            case 'fedora':
            case 'mac os':
                return logos_1.logos[logo];
        }
    };
    const checkBattery = () => {
        let result = true;
        si.battery().then(data => result = data.hasBattery);
        return result;
    };
    // Source: https://stackoverflow.com/a/52387803
    const secondsToDhms = (seconds) => {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor(seconds % (3600 * 24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : '';
        const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
        const mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '';
        return dDisplay + hDisplay + mDisplay;
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
    si.graphics().then(data => setResolution(data.displays.map(item => `${item.resolutionX}x${item.resolutionY}`)))
        .catch(e => console.log(e));
    si.battery().then(data => setBattery(`${data.percent}%`))
        .catch(e => console.log(e));
    si.cpu().then(data => setCPU(`${data.manufacturer} ${data.brand} ${data.speed}`))
        .catch(e => console.log(e));
    si.graphics().then(data => setGPU(data.controllers.map(item => `${item.vendor} ${item.model}`)))
        .catch(e => console.log(e));
    si.mem().then(data => setRAM(`${formatBytes(data.used)} / ${formatBytes(data.total)}`))
        .catch(e => console.log(e));
    setInterval(() => setUptime(secondsToDhms(si.time().uptime)), 1000);
    // @ts-ignore
    // @ts-ignore
    return (React.createElement(Ink.Box, { flexDirection: "row", paddingLeft: 1, paddingTop: 1, paddingBottom: 1 },
        React.createElement(Ink.Box, { paddingRight: 2 },
            React.createElement(Ink.Text, null, getLogo())),
        React.createElement(Ink.Box, { flexDirection: "column", paddingTop: 5 },
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "OS: "),
                React.createElement(Ink.Text, null, sysinfo.OS)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "Host: "),
                React.createElement(Ink.Text, null, sysinfo.host)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "Kernel: "),
                React.createElement(Ink.Text, null, sysinfo.kernel)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "Shell: "),
                React.createElement(Ink.Text, null, sysinfo.shell)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "Resolution: "),
                sysinfo.resolution.length > 1
                    ? React.createElement(Ink.Text, null, `${sysinfo.resolution.join('\n')}`)
                    : React.createElement(Ink.Text, null, sysinfo.resolution)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "CPU: "),
                React.createElement(Ink.Text, null, sysinfo.CPU)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "GPU: "),
                sysinfo.GPU.length > 1
                    ? React.createElement(Ink.Text, null, `${sysinfo.GPU.join('\n')}`)
                    : React.createElement(Ink.Text, null, sysinfo.GPU)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "RAM: "),
                React.createElement(Ink.Text, null, sysinfo.RAM)),
            React.createElement(Ink.Box, { flexDirection: "row" },
                React.createElement(Ink.Text, { color: "blueBright" }, "Uptime: "),
                React.createElement(Ink.Text, null, sysinfo.uptime)),
            checkBattery()
                ? React.createElement(Ink.Box, { flexDirection: "row" },
                    React.createElement(Ink.Text, { color: "blueBright" }, "Battery: "),
                    React.createElement(Ink.Text, null, sysinfo.battery))
                : React.createElement(React.Fragment, null))));
};
Ink.render(React.createElement(App, null));
