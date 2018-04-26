import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ListView,
    RefreshControl,
    DeviceEventEmitter
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from '../pages/RepositoryDetail';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state={
            languages: []
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages: result
                })
            })
            .catch(error=>{
                console.log(error)
            })
    }
    render(){
        let content = this.state.languages.length>0?<ScrollableTabView
            tabBarBackgroundColor={"#2196F3"}
            tabBarInactiveTextColor={"mintcream"}
            tabBarActiveTextColor={"white"}
            tabBarUnderLineStyle={{backgroundColor:'#e7e7e7',height:2}}
            renderTabBar={()=><ScrollableTabBar/>}
        >
            {this.state.languages.map((result,index)=>{
                return result.checked?<PopularTab key={index} tabLabel={result.name} {...this.props}>
                </PopularTab>:null;
            })}
        </ScrollableTabView>:null;
        return (
            <View style={styles.container}>
                <NavigationBar
                title={'最热'}
                style={{backgroundColor:'#2196F3'}}
                />
                {content}
            </View>
        )
    }
}

class PopularTab extends Component{
    constructor(props){
        super(props);
        this.dataRespository = new DataRepository();
        this.state = {
            result: '',
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading: false
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.setState({
           isLoading:true
        });
        let url = this.getUrl(this.props.tabLabel);
        this.dataRespository.fetchRepository(url)
            .then(result=>{
                let items = result&&result.items? result.items:result?result:[];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                });
                if (result&&result.update_date&&!this.dataRespository.checkData(result.update_date)){
                    DeviceEventEmitter.emit('showToast', '数据过时');
                    return this.dataRespository.fetchNetRepository(url)
                } else {
                    DeviceEventEmitter.emit('showToast','显示缓存数据')
                }
            })
            .then(items=>{
                if (!items||items.length===0)return;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                });
                DeviceEventEmitter.emit('showToast','显示网络数据')
            })
            .catch(error => {
                console.log(error);
            })
    }
    getUrl(key){
        return URL+key+QUERY_STR;
    }
    onSelectRepository(rowData) {
        this.props.navigator.push({
            component: RepositoryDetail,
            params:{
                item:rowData,
                ...this.props
            }
        })
    }
    renderRow(rowData){
        return (
            <RepositoryCell rowData={rowData}
                            key={rowData.id}
                            onSelect={() => this.onSelectRepository(rowData)}
            />
        )
    }
    render(){
        return (
            <View style={{flex:1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=> this.loadData()}
                        colors={['#2196F3']}
                        tintColor={'#2196F3'}
                        title={'Loading...'}
                        titleColor={'#2196F3'}
                        />
                    }
                >
                </ListView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 29
    }
});