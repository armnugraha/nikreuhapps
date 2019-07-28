import React, { Component } from "react";
import {
  View
} from "react-native";
import { Button, Text } from "native-base";

export default class Kosong extends Component {

    constructor(props) {
        super(props);
    
        this.state = {

            test: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
                    properties: {
                      icon: "ic_n_gate",
                      notes:"Pintu Masuk",
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [107.745091, -6.893077],
                    },
                  }
                ]}
        }
    }

    coba(){
        const coords = Object.assign([], this.state.test.features);

        var data = {
            type: 'Feature',
            id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
            properties: {
              icon: "ic_n_gate",
              notes:"Pintu Masuk",
            },
            geometry: {
              type: 'Point2',
              coordinates: [107.745091, -6.893077],
            },
          }

        coords.push(data);
        this.setState({test: coords});
    }

    cek(){
        alert(JSON.stringify(this.state.test))
    }

    render(){

        return(
            <View>
                <Button onPress={() => this.coba()}>
                    <Text>cek</Text>
                </Button>
                <Button onPress={() => this.cek()}>
                    <Text>cek</Text>
                </Button>
            </View>
        )
    }
}