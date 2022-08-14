import * as Ink from 'ink';
import * as React from 'react';
import * as si from 'systeminformation';

const App = (): JSX.Element => {


    // Source https://stackoverflow.com/a/18650828

    const formatBytes= (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }


    const [OS, setOS] = React.useState<string>('N/A');
    const [kernel, setKernel] = React.useState<string>('N/A');
    const [host, setHost] = React.useState<string>('N/A');
    const [shell, setShell] = React.useState<string>('N/A');
    const [resolution, setResolution] = React.useState<string>('N/A');
    const [CPU, setCPU] = React.useState<string>('N/A');
    const [GPU, setGPU] = React.useState<string>('N/A');
    const [RAM, setRAM] = React.useState<string>('N/A');
    const [logo, setLogo] = React.useState<string>('')

    const sysinfo: ISysInfo = {
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
        setLogo(data.logofile)
    })
        .catch(e => console.log(e))

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

    return (
        <Ink.Box flexDirection='row' paddingTop={1}>
            <Ink.Box paddingRight={2}><Ink.Text>{sysinfo.logo}</Ink.Text></Ink.Box>
            <Ink.Box flexDirection='column'>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>OS: </Ink.Text><Ink.Text>{sysinfo.OS}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>Host: </Ink.Text><Ink.Text>{sysinfo.host}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>Kernel: </Ink.Text><Ink.Text>{sysinfo.kernel}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>Shell: </Ink.Text><Ink.Text>{sysinfo.shell}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>Resolution: </Ink.Text><Ink.Text>{sysinfo.resolution}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>CPU: </Ink.Text><Ink.Text>{sysinfo.CPU}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>GPU: </Ink.Text><Ink.Text>{sysinfo.GPU}</Ink.Text></Ink.Box>
                <Ink.Box flexDirection='row'><Ink.Text color='blueBright'>RAM: </Ink.Text><Ink.Text>{sysinfo.RAM}</Ink.Text></Ink.Box>
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
    resolution: string,
    CPU: string,
    GPU: string,
    RAM: string,
    logo: string,
}

