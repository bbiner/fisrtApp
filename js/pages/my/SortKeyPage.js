import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Alert
} from 'react-native';
import LanguageDao,{FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import SortableListView from 'react-native-sortable-listview';
import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
export default class SortKeyPage extends Component{
    constructor(props){
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }
    componentDidMount(){
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.getCheckedItems(result)
            })
            .catch(error=>{
                console.log(error);
            })
    }
    getCheckedItems(result){
        this.dataArray=result;
        let checkedArray = [];
        for (let i=0, len=result.length;i<len;i++){
            if (result[i].checked) checkedArray.push(result[i]);
        }
        this.setState({
            checkedArray:checkedArray
        });
        this.originalCheckedArray=ArrayUtils.clone(checkedArray)
    }
    onBack(){
        if (ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '提示',
            '是否保存修改？',
            [
                {text:'否', onPress:()=>{this.props.navigator.pop();},style:'cancel'},
                {text:'是', onPress:()=>{this.onSave(true);},style:'cancel'}
            ]
        )
    }
    onSave(isChecked){
        if (!isChecked&&ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
            this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();
    }
    getSortResult(){
        this.sortResultArray=ArrayUtils.clone(this.dataArray);
        for(let i=0,l=this.originalCheckedArray.length;i<l;i++){
            let item = this.originalCheckedArray[i];
            let index=this.dataArray.indexOf(item);
            this.sortResultArray.splice(index,1,this.state.checkedArray[i])
        }
    }
    render(){
        let rightButton = <TouchableOpacity
            onPress={()=>{this.onSave()}}
        >
            <View style={{margin:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    rightButton={rightButton}
                />
                <SortableListView
                    style={{flex:1}}
                    data={this.state.checkedArray}
                    order= {Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedAr.ray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                    }}
                    renderRow={row => <SortCell data={row}/>}
                />
            </View>
        )
    }
}

class SortCell extends Component{
    render(){
        return <TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={500}
            style={styles.item}
            {...this.props.sortHandlers}
        >
            <Text style={styles.row}>
                <Image style={styles.image} source={require('./img/ic_sort.png')}/>
                {this.props.data.name}
            </Text>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    tips: {
        fontSize: 20
    },
    item: {
        padding:25,
        backgroundColor:'#F8F8F8',
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    row: {
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        tintColor:'#2196F3',
        height:16,
        width:16,
        marginRight:10
    },
    title: {
        fontSize:20,
        color:'#FFFFFF'
    }
});