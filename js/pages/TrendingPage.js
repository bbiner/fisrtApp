/**
 * Created by penn on 2016/12/19.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository';

export default class TrendingTest extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
        this.state = {
            data: ''
        }
    }

    onClick() {
        this.loadData('https://github.com/trending/' + this.text)
    }

    loadData(url) {
        this.dataRepository.fetchRepository(url)
            .then((data) => {
                this.setState({
                    data: JSON.stringify(data)
                })
            })
            .catch((error) => {
                this.setState({
                    data: error
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           onChangeText={(text) => {
                               this.text = text;
                           }}
                />
                <Text style={styles.welcome} onPress={() => this.onClick()}>
                    加载数据
                </Text>
                <Text style={styles.result}>
                    {this.state.data}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        borderWidth: 1
    },
    result: {
        height: 200,
        backgroundColor: 'gray'
    },
});