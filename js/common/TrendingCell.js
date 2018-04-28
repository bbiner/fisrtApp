import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';
export default class RepositoryCell extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let description = '<p>'+this.props.description+'</p>';
        return(
            <TouchableOpacity sytle={styles.container}
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.rowData.fullName}</Text>
                    <HTMLView
                        value={description}
                        onLinkLongPress={(url)=>{}}
                        stylesheet={{
                            p:styles.description,
                            a:styles.description
                        }}
                    />
                    <Text style={[styles.description, {fontSize: 14}]}>{this.props.rowData.meta}</Text>
                    <View style={styles.row}>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={styles.description}>Build by </Text>
                            {this.props.rowData.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{height:22, width:22, margin:2}}
                                    source={{uri:arr[i]}}
                                />
                            })}
                        </View>
                        <Image style={{width:22, height:22}} source={require('../../res/images/ic_star.png')}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex: 1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width:0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation:2
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
});