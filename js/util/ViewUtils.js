import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

export default class ViewUtils extends Component{
    static getLeftButton(callBack){
        return <TouchableOpacity
            sylte={{padding: 8}}
            onPress={callBack}>
            <Image
                style={{width:26,height:26,tintColor:'white'}}
                source={require('../../res/images/ic_arrow_back_white_36pt.png')}
            />
        </TouchableOpacity>
    }
}