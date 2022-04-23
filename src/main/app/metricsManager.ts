//import * as Mixpanel from 'mixpanel';
import * as ip from 'ip';

class MetricsManager { 

    // properties
    _client: any | null;
    _userId: string | null;

    constructor() {

        const api_key: string = process.env.MIXPANEL_MMAP_KEY || ""

	/*
        this._client = Mixpanel.init(api_key, {
            protocol: 'https'
        });
	*/

        this._userId = "";
    }

    setUserId(userId: string) {
        this._userId = userId;
    }

    createUser() {
	console.log('metricsManger - no op user create')
	  /*
        this._client.people.set(this._userId, {
            $created: (new Date()).toISOString(),
            $ip: ip.address(),
            plan: 'basic',
            searches: 0,
            saves: 0,
            deletes: 0,
            updates: 0,
            logins: 0,
        });
	*/
    }

    userLogin() {
	 console.log("metricsManager - no op user login")
        //this._client.people.increment(this._userId, 'logins')
    }

    userSearch() {
	 console.log("metricsManager - no op user user search")
        //this._client.people.increment(this._userId, 'searches')
        //this._client.track('search', { user: this._userId })
    }

    userSave() {
	 console.log("metricsManager - no op user user save")
        //this._client.people.increment(this._userId, 'saves')
        //this._client.track('save', { user: this._userId })
    }

    userUpdates() {
	 console.log("metricsManager - no op user user update")
        //this._client.people.increment(this._userId, 'updates')
    }

    userDeletes() {
	 console.log("metricsManager - no op user user delete")
        //this._client.people.increment(this._userId, 'deletes')
    }

}

export { MetricsManager };
