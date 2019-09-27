import React, { Component } from 'react'
import OlMap from 'ol/Map'
import OlView from 'ol/View'
import OlLayerTile from 'ol/layer/Tile'
import OlSourceOSM from 'ol/source/OSM'
import * as olProj from 'ol/proj'

import './style.css'
import ButtonApplication from '../../Components/button'

class Mapa extends Component {

    constructor(props) {
        super(props)
    
        this.state = { center: olProj.fromLonLat([-54.72722222, -20.45], 'EPSG:3857'), zoom: 14 }
    
        this.olmap = new OlMap({
          target: null,
          layers: [
            new OlLayerTile({
              source: new OlSourceOSM()
            })
          ],
          view: new OlView({
            center: this.state.center,
            zoom: this.state.zoom
          })
        })
    }


    updateMap() {
        this.olmap.getView().setCenter(this.state.center)
        this.olmap.getView().setZoom(this.state.zoom)
      }

    componentDidMount() {
        this.olmap.setTarget("map")

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter()
      let zoom = this.olmap.getView().getZoom()
      this.setState({ center, zoom })
    })
    }

    shouldComponentUpdate(nextProps, nextState) { //pesquisar este sujeito
        let center = this.olmap.getView().getCenter()
        let zoom = this.olmap.getView().getZoom()
        if (center === nextState.center && zoom === nextState.zoom) return false
        return true
      }
    
      userAction() {
        this.setState({ center: olProj.fromLonLat([-54.72722222, -20.45], 'EPSG:3857'), zoom: 14 })
      }
    
      render() {
        this.updateMap() // Update map on render?
        return (
          <div id="map">

              <div className="container-button">
                
                <button className="button-pattern" text="click" onClick={e => this.userAction()}>ckickIt</button>} 
                <ButtonApplication onClick={e => this.userAction()} text="click"></ButtonApplication>
              </div>
          </div>
        )
      }
}

export default Mapa