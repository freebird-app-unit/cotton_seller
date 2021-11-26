import React from 'react';
import {StyleSheet, View, ViewPropTypes, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../common/colors';
import {GenericStyles} from '../styles/GenericStyles';
import { theme } from '../core/theme';
import { heightPercentageToDP } from '../components/responsive-ratio';

const CustomTextInput = function(props) {
  const {
    containerStyle,
    style,
    LeftComponent,
    RightComponent,
    refCallback,
    ...remainingProps
  } = props;
  // ref = { refCallback }
  console.log('refCallback', refCallback)
  return (
    <View style={[styles.containerStyle, containerStyle,style]}>
      {LeftComponent}
      <TextInput
        {...remainingProps}
        style={[styles.textInputStyle, GenericStyles.fill, style]}
        ref={refCallback}
      />
      {RightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    // borderColor: colors.GREEN,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  textInputStyle: {
    padding: 0,
    color:theme.colors.blackBG,
    fontSize:heightPercentageToDP(2.1),
    fontFamily:'Poppins-Bold'
  },
});

CustomTextInput.defaultProps = {
  LeftComponent: <></>,
  RightComponent: <></>,
};

CustomTextInput.propTypes = {
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  LeftComponent: PropTypes.object,
  RightComponent: PropTypes.object,
  refCallback: PropTypes.func,
};

export default CustomTextInput;
