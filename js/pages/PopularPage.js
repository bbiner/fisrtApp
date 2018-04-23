import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ListView,
    RefreshControl
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars';
export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
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
                return result.checked?<PopularTab key={index} tabLabel={result.name}>
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
        let url = this.getUrl(this.text);
        this.dataRespository.fetchNetRepository(url)
            .then(result=>{
                console.log(result.items);
                this.setState({
                    // result:result.items
                    dataSource:this.state.dataSource.cloneWithRows(result.items),
                    isLoading: false
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    getUrl(key){
        return URL+this.props.tabLabel+QUERY_STR;
    }
    renderRow(rowData){
        return (
            <RepositoryCell rowData={rowData}/>
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