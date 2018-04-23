import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
export default class Mypage extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={"我的"}
                    style={{backgroundColor:'#6495ED'}}
                />
                <Text style={styles.tips}
                    onPress={()=>{
                        this.props.navigator.push({
                            component: CustomKeyPage,
                            params: {...this.props}
                        })
                    }}
                >
                    自定义标签页
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips: {
        fontSize: 20
    }
});