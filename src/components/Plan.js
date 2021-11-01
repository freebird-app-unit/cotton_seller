import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, View, Text, ScrollView,
    useWindowDimensions, Image, TouchableOpacity,
} from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import Swiper from 'react-native-swiper';
import { GenericStyles } from '../styles/GenericStyles';
import colors from '../common/colors';

import {
    FullButtonComponent,
} from '../lib';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import defaultMessages from '../helpers/defaultMessages';
import TextInput from '../components/TextInput';
import { FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import api_config from '../Api/api';
import axios from 'axios';

const Plans = ({ navigation }) => {

    // console.log('props>>', navigation)

    const [Plan, setPlan] = useState([])


    const [itemChecked, setItemChecked] = useState(false);


    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        paddingBottom: 30,
        paddingTop: hp(3),
        // marginTop: hp(2),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    };
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {

        try {
            setSpinner(true)
            let data = {

                "deal_id": 1, "upload_by": "seller", "sample": 1
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.PLAN_LIST,
                method: 'GET',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }).then(function (response) {
                console.log('res', response.data)
                if (response.data.status == 200) {

                    let p = response.data.data.map(item => {
                        item.selected = false
                        return item
                    })
                    console.log('p', p)
                    setPlan(p)
                    // navigation.setParams({
                    //     ProfileData: response.data.data,
                    // });
                    setSpinner(false)
                } else {
                    console.log(response.data.message);
                }
            })
                .catch(function (error) {
                    setSpinner(false)
                    console.log('error', JSON.stringify(error))
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log(error);
        }

    }, [])

    const onSubmitButtonPress = () => {
        navigation.navigate('LoginScreen')
        setSubmittingOtp(false)
    }

    const [submittingOtp, setSubmittingOtp] = useState(true);

    const InPutText = (props) => {
        return (
            <View style={{
                backgroundColor: '#fff', width: wp(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <View style={{ width: wp(30), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                    <Text style={{
                        fontSize: hp(1.9),
                        color: theme.colors.text,
                        fontFamily: "Poppins-Regular"
                    }}>{props.label}</Text></View>
                <View style={{ width: wp(43), marginVertical: -4 }}><TextInput
                    returnKeyType="next"
                    require={true}
                    maxLength={50}
                    {...props}
                /></View>
                <View style={{ width: wp(18), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                    <Text style={{
                        fontSize: hp(1.7),
                        color: theme.colors.text,
                        opacity: 0.5,
                        fontFamily: "Poppins-Regular",
                        width: wp(18)
                    }} numberOfLines={2}>{props.labelValue}</Text></View>




            </View>
        )
    }


    // const FirstRoute = () => (
    //     <View style={{ flex: 1, marginTop: hp(1) }}>

    //         <Image style={{ width: wp(90), height: hp(25) }} source={require('../images/a1.png')} />
    //         <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: wp(2) }}>

    //             <Text style={styles.label}>Punjab Agriculture University (PAU) on wednesday asked the cotton growers to</Text>
    //             <Text style={[styles.VAlue1], { opacity: 0.5 }}>1h ago</Text>
    //         </View>
    //     </View>



    // );


    const select = (item) => {

        item.selected = !item.selected
        const updated = Plan.map((it) => {
            it.selected = false;
            if (it.id === item.id) {
                it.selected = !it.selected;
            }
            return it;
        });

        console.log('updated', updated)

        setPlan(updated)
        setItemChecked((prevState) => !prevState);
        // setPlan(pl)
    }





    const renderItem = ({ item }) => {
        return <View style={{
            borderWidth: wp(0.3), width: wp(40), margin: wp(2.5),
            paddingTop: hp(1), backgroundColor: 'rgba(0,0,0,0.02)',
            borderColor: item.selected ? theme.colors.primary : 'rgba(0,0,0,0.1)',
            justifyContent: 'space-between', borderRadius: wp(5),
            zIndex: 8888
        }} onStartShouldSetResponder={() => select(item)}>
            {item.selected && <View style={{ height: hp(3), width: hp(3), zIndex: 10000, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: hp(-1.5), left: wp(20) - hp(1.5) }}>
                <Ionicons name='checkmark-circle' size={hp(3)} color={theme.colors.primary} />
            </View>}
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ height: hp(9), marginTop: hp(1), alignItems: 'center' }}>
                    <Text style={{
                        fontSize: hp(2.2),
                        color: theme.colors.text,
                        opacity: 0.5,
                        fontFamily: "Poppins-Regular",
                    }}>Validity</Text>
                    <Text style={styles.label}>{item.validity} Days</Text>
                </View>
                <View style={{ width: wp(40), justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style={{
                        height: hp(4), justifyContent: 'center', alignItems: 'center',
                        backgroundColor: theme.colors.primary, width: wp(40),
                        borderBottomEndRadius: wp(5), borderBottomStartRadius: wp(5)
                    }}>
                        <Text style={styles.value}>{item.price}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }

    // const setIndex = (index) => setId(index);

    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <View style={backgroundStyle}>
                <Spinner visible={spinner} color="#085cab" />
                {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
                <View style={{ flex: 1, backgroundColor: 'white', }}>

                    <View style={{
                        flex: 1, width: wp(100),
                        flexDirection: 'column', backgroundColor: '#fff', paddingHorizontal: wp(5)
                    }}>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={Plan}
                                numColumns={2}
                                renderItem={renderItem}
                                extraData={itemChecked}
                            />
                        </View>
                        <FullButtonComponent
                            type={'fill'}
                            text={'Done'}
                            textStyle={styles.submitButtonText}
                            buttonStyle={GenericStyles.mt24}
                            onPress={onSubmitButtonPress}
                            disabled={submittingOtp}
                        />
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.4),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    value: {
        fontSize: hp(2.5),
        color: '#fff',
        fontFamily: "Poppins-Bold",
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    submitButtonText: {
        color: colors.WHITE,
        //backgroundColor:colors.GREEN,
        fontFamily: 'popins',
        fontSize: 18,
        alignItems: 'center',
    },

})

export default Plans