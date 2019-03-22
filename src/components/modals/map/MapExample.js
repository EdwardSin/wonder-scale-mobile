{/* <MapView style={styles.map} showsUserLocation rotateEnabled={false} loadingEnabled 
                ref={map => this.map = map}
                initialRegion={this.state.region}
                style={styles.map}      
                //onRegionChangeComplete={this.props.onMapChanged} region={this.getMapRegion()}
                >
                    <Circle center={{ latitude: this.props.centerLatitude, longitude: this.props.centerLongitude }}
                        radius={this.props.radius} fillColor="rgba(51, 175, 255, 0.2)"
                        strokeColor="rgba(55, 85, 170, 0.6)" strokeWidth={1} />

                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })} */}
                    {/* {this.props.shops && this.props.shops.map(shop => {

                        // const scaleStyle = {
                        //     transform: [
                        //         {
                        //             scale: interpolations[index].scale,
                        //         },
                        //     ],
                        // };
                        // const opacityStyle = {
                        //     opacity: interpolations[index].opacity,
                        // };
                        return
                        (
                            <View>
                                <Marker key={shop._id} coordinate={{ longitude: shop.location.coordinates[0], latitude: shop.location.coordinates[1] }} />
                                <MapView.Marker key={index} coordinate={shop.location.coordinates}>
                                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                        <Animated.View style={[styles.ring, scaleStyle]} />
                                        <View style={styles.marker} />
                                    </Animated.View>
                                </MapView.Marker>
                            </View>);
                    })
                    } */}
                {/* </MapView> */}