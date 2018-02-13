import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation';

const App = StackNavigator({
    Home: FlatListBasics,// говорит что этот класс не screen
    Profile: ProfileScreen,
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'HomeScreen',
    };

    render() {

        const {navigate} = this.props.navigation;

    }
}

var dataSource = [];
class FlatListBasics extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isLoading: true,
    //     }
    // }

    load(offset) {
        return fetch(`http://9834436605.myjino.ru/api/get-posts?limit=20&offset=${offset}&user_id=1`)
            .then((response) => response.json())
            .then((responseJson) => {
                dataSource = dataSource.concat(responseJson.news);
                this.setState({
                    isLoading: false,
                }, function () {
                    console.log(dataSource.length);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.load(0);
    }

    render() {

        if (this.state.isLoading)
            return (
                <Text style={styles.loading}>loading...</Text>
            );
        const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <Text style={styles.textToolbar}>Toolbar</Text>
                </View>
                <Button
                    title="Go to Jane's profile"
                    onPress={() =>
                        navigate('Profile', {name: 'Jane'})
                    }
                />
                <FlatList
                    data={dataSource}
                    onEndReached={() => {
                        this.load(dataSource.length)
                    }}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.itemView}>
                                <Text style={styles.title}>post_id: {item.post_id}</Text>
                                <Text style={styles.item}>{item.title}</Text>

                            </View>
                        )
                    }}
                />
            </View>
        );
    }
}

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        <Text style={styles.loading}>ProfileScreen</Text>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 4,
        backgroundColor: '#eeeeee'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    itemView: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
        marginBottom: 30,
        shadowRadius: 2,
    },
    title: {
        padding: 10,
        fontSize: 14,
    },
    toolbar: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingBottom: 20,
        height: 80,
        backgroundColor: '#0000FF',
    },
    textToolbar: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    loading: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingBottom: 10,
    }
})