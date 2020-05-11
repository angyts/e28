import Api from '@/common/api.js';

export const config = {
    firebase: {
        apiKey: 'AIzaSyC1DvjXr9NZYeT0rTbcq_WytVsj1BmwbSA',
        projectId: 'zenith-schedules'
    }
}

export const api = new Api({
    apiKey: config.firebase.apiKey,
    projectId: config.firebase.projectId
});