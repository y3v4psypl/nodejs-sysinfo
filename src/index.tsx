import * as Ink from 'ink';
import * as React from 'react';
import * as si from 'systeminformation';
import {logos as logoList} from './logos';

const App = (): JSX.Element => {
    const [OS, setOS] = React.useState<string>('N/A');
    const [kernel, setKernel] = React.useState<string>('N/A');
    const [host, setHost] = React.useState<string>('N/A');
    const [shell, setShell] = React.useState<string>('N/A');
    const [resolution, setResolution] = React.useState<string[]>(['N/A']);
    const [CPU, setCPU] = React.useState<string>('N/A');
    const [GPU, setGPU] = React.useState<string[]>(['N/A']);
    const [RAM, setRAM] = React.useState<string>('N/A');
    const [logo, setLogo] = React.useState<string>('N/A');

    const sysinfo: ISysInfo = {
        OS,
        kernel,
        host,
        shell,
        resolution,
        CPU,
        GPU,
        RAM,
        logo,
    };

    // Source https://stackoverflow.com/a/18650828

    const formatBytes= (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const getLogo = () => {
        switch (logo) {
            case 'debian':
            case 'gentoo':
            case 'mint':
            case 'fedora':
            case 'mac os':
                return logoList[logo];
        }
    }

    // Source: https://stackoverflow.com/a/52387803

    const secondsToDhms = (seconds: number) => {
        const d = Math.floor(seconds / (3600*24));
        const h = Math.floor(seconds % (3600*24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);

        const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
        const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
        return dDisplay + hDisplay + mDisplay;
    }

    si.osInfo().then(data => {
        setOS(data.distro);
        setKernel(data.kernel);
        setHost(data.hostname);
        setLogo(data.logofile)
    })
        // .catch(e => console.log(e));

    si.shell().then(data => setShell(data))
        // .catch(e => console.log(e));

    si.graphics().then(data => setResolution(data.displays.map(item => `${item.resolutionX}x${item.resolutionY}`)))
        .catch(e => setResolution([e]));

    si.cpu().then(data => setCPU(`${data.manufacturer} ${data.brand} ${data.speed}`))
        // .catch(e => console.log(e));

    si.graphics().then(data => setGPU(data.controllers.map(item => `${item.vendor} ${item.model}`)))
        // .catch(e => console.log(e));

    si.mem().then(data => setRAM(`${formatBytes(data.used)} / ${formatBytes(data.total)}`))
        // .catch(e => console.log(e));

    return (
        <Ink.Box flexDirection='row' paddingLeft={1} paddingTop={1} paddingBottom={1}>
            <Ink.Box paddingRight={2}>
                <Ink.Text>{getLogo()}</Ink.Text>
            </Ink.Box>
            <Ink.Box flexDirection='column' paddingTop={5}>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>OS: </Ink.Text>
                    <Ink.Text>{sysinfo.OS}</Ink.Text>
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>Host: </Ink.Text>
                    <Ink.Text>{sysinfo.host}</Ink.Text>
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>Kernel: </Ink.Text>
                    <Ink.Text>{sysinfo.kernel}</Ink.Text>
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>Shell: </Ink.Text>
                    <Ink.Text>{sysinfo.shell}</Ink.Text>
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>Resolution: </Ink.Text>
                    {sysinfo.resolution.length > 1
                        ? <Ink.Text>{`${sysinfo.resolution.join('\n')}`}</Ink.Text>
                        : <Ink.Text>{sysinfo.resolution}</Ink.Text>
                    }
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>CPU: </Ink.Text>
                    <Ink.Text>{sysinfo.CPU}</Ink.Text>
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>GPU: </Ink.Text>
                    {sysinfo.GPU.length > 1
                        ? <Ink.Text>{`${sysinfo.GPU.join('\n')}`}</Ink.Text>
                        : <Ink.Text>{sysinfo.GPU}</Ink.Text>
                    }
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>RAM: </Ink.Text>
                    <Ink.Text>{sysinfo.RAM}</Ink.Text>
                </Ink.Box>
                <Ink.Box flexDirection='row'>
                    <Ink.Text color='blueBright'>Uptime: </Ink.Text>
                    <Ink.Text>{typeof(si.time().uptime) ? secondsToDhms(si.time().uptime) : 'N/A'}</Ink.Text>
                </Ink.Box>
            </Ink.Box>
        </Ink.Box>
    );
};

Ink.render(<App />);


interface ISysInfo {
    OS: string,
    host: string,
    kernel: string,
    shell: string,
    resolution: string[],
    CPU: string,
    GPU: string[],
    RAM: string,
    logo: string,
}

