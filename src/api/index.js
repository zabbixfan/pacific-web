import config from '../config'
const Host = config.apiHost

export default {
    getUserByToken: Host + '/api/userinfo',
    getDnsList: Host + '/api/dnslist',
    Dns: (record) => Host + '/api/dns/' + record,
    batch: (record) => Host + '/api/dnsbatch/' + record,
    getRepoList: Host + '/api/repolist',
    syncCode: (id) => Host + '/api/cs/' + id,
    getSearchList: Host + '/api/historylist',
    getUser: 'http://alopex.apitops.com/api/usersearch'
}
