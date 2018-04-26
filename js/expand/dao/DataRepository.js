import {AsyncStorage} from 'react-native';
export default class DataRepository{
    fetchRepository(url){
        return new Promise((resolve,reject)=>{
            this.fetchLocalRepository(url)
                .then(result=>{
                    if (result){
                        resolve(result)
                    } else {
                        this.fetchNetRepository(url)
                            .then(result=>{
                                resolve(result)
                            })
                            .catch(e=>{
                                resolve(e)
                            })
                    }
                })
                .catch(e=>{
                    this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result);
                        })
                        .catch(e=>{
                            reject(e)
                        })
                })
        })
    }

    /**
     * 获取本地数据
     * @returns {Promise}
     */
    fetchLocalRepository(url){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result)=>{
                if(!error){
                    try {
                        resolve(JSON.parse(result))
                    } catch (e){
                        reject(e)
                    }
                } else {
                    reject(error)
                }
            })
        })
    }

    fetchNetRepository(url){
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if (!result){
                        reject(new Error('responseData is null'));
                        return;
                    }
                    this.saveRepository(url, result.items);
                    resolve(result.items);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    saveRepository(url, items){
        if(!url || !items) return;
        let wrapData={items:items,update_date:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData), (error)=>{});
    }

    /**
     * 判断数据是否过时
     * @param longTime
     * @returns {boolean}
     */
    checkData(longTime){
        let cDate=new Date();
        let tDate=new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth()!== tDate.getMonth())return false;
        if (cDate.getDay()!== tDate.getDay())return false;
        if (cDate.getHours()- tDate.getHours()>4)return false;
        return true;
    }
}