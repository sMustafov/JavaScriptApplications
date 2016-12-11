function attachEvents() {
    const appId = 'kid_BJ_Ke8hZg';
    const username = 'guest';
    const password = 'pass';
    const base64Auth = btoa(`${username}:${password}`);
    const authorizationHeader = {Authorization: `Basic ${base64Auth}`};
    const apiBaseUrl = `https://baas.kinvey.com/appdata/${appId}/`;
}