import React, {Component} from 'react';
import {
    StyleSheet,
    WebView,
    Text,
    View
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../util/ViewUtils';

export default class RepositoryDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: this.props.item.html_url,
            canGoBack: false,
            title: this.props.item.full_name
        }
    }
    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }
    onNavigationStateChange(e){
        this.setState({
            canGoBack: e.canGoBack,
            url:e.url
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    title={this.state.title}
                />
                <WebView
                    ref={webView=>this.webView=webView}
                    startInloadingState={true}
                    onNavigationStateChange={e=>this.onNavigationStateChange(e)}
                    source={{uri:this.state.url}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
   container: {
       flex:1,
       backgroundColor: '#ffffff'
   }
});