import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Switch,
} from "react-native";
// import SQLite from "react-native-sqlite-2";
import * as SQLite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Alert } from "react-native";

import styles from "../style/styles";

const RawMill = ({ limeVal, setlimeVal }) => {
  const Tab = createBottomTabNavigator();
  //#region
  // SQL DB
  const [db, setDb] = useState(SQLite.openDatabase("RM.db"));

  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);
  // MATERIAL ANALYSIS useStates
  const [C16TotalEnable, setC16TotalEnable] = useState(false);
  const [C17TotalEnable, setC17TotalEnable] = useState(false);
  const [C18TotalEnable, setC18TotalEnable] = useState(false);
  const [C19TotalEnable, setC19TotalEnable] = useState(false);
  const [previousDataLoaded, setPreviousDataLoaded] = useState(false);

  let { total_C15, total_C16, total_C17, total_C18, total_C19 } = 0.0;

  //START NAME: RAW MILL 2
  // FORMULAS

  //DONE
  //Material Setting
  //can be change
  //Limestome, Shale, Sand, Iron

  let [D15, setD15] = useState(0.0);
  let [E15, setE15] = useState(0.0);
  let [F15, setF15] = useState(0.0);
  let [G15, setG15] = useState(0.0);

  //Material Q31_LOI
  //fixed cell
  // let { D16, E16, F16, G16 } = 0.0;
  // let { D17, E17, F17, G17 } = 0.0;
  // let { D18, E18, F18, G18 } = 0.0;
  // let { D19, E19, F19, G19 } = 0.0;

  //DONE
  //XRF Analysis
  //can be change
  let [H15_SiO2, setH15_SiO2] = useState(0.0);
  let [H16_SiO2, setH16_SiO2] = useState(0.0);
  let [H17_SiO2, setH17_SiO2] = useState(0.0);
  let [H18_SiO2, setH18_SiO2] = useState(0.0);

  let [I15_Al2O3, setI15_Al2O3] = useState(0.0);
  let [I16_Al2O3, setI16_Al2O3] = useState(0.0);
  let [I17_Al2O3, setI17_Al2O3] = useState(0.0);
  let [I18_Al2O3, setI18_Al2O3] = useState(0.0);

  let [J15_Fe2O3, setJ15_Fe2O3] = useState(0.0);
  let [J16_Fe2O3, setJ16_Fe2O3] = useState(0.0);
  let [J17_Fe2O3, setJ17_Fe2O3] = useState(0.0);
  let [J18_Fe2O3, setJ18_Fe2O3] = useState(0.0);

  let [K15_CaO, setK15_CaO] = useState(0.0);
  let [K16_CaO, setK16_CaO] = useState(0.0);
  let [K17_CaO, setK17_CaO] = useState(0.0);
  let [K18_CaO, setK18_CaO] = useState(0.0);

  let [L15_MgO, setL15_MgO] = useState(0.0);
  let [L16_MgO, setL16_MgO] = useState(0.0);
  let [L17_MgO, setL17_MgO] = useState(0.0);
  let [L18_MgO, setL18_MgO] = useState(0.0);

  let [M15_Na2O, setM15_Na2O] = useState(0.0);
  let [M16_Na2O, setM16_Na2O] = useState(0.0);
  let [M17_Na2O, setM17_Na2O] = useState(0.0);
  let [M18_Na2O, setM18_Na2O] = useState(0.0);

  let [N15_K2O, setN15_K2O] = useState(0.0);
  let [N16_K2O, setN16_K2O] = useState(0.0);
  let [N17_K2O, setN17_K2O] = useState(0.0);
  let [N18_K2O, setN18_K2O] = useState(0.0);

  let [O15_SO3, setO15_SO3] = useState(0.0);
  let [O16_SO3, setO16_SO3] = useState(0.0);
  let [O17_SO3, setO17_SO3] = useState(0.0);
  let [O18_SO3, setO18_SO3] = useState(0.0);

  let [P15_Cl, setP15_Cl] = useState(0.0);
  let [P16_Cl, setP16_Cl] = useState(0.0);
  let [P17_Cl, setP17_Cl] = useState(0.0);
  let [P18_Cl, setP18_Cl] = useState(0.0);

  //DONE
  //XRF Analysis
  //fixed cell
  let [Q15_LOI, setQ15_LOI] = useState(0.0);
  let [Q16_LOI, setQ16_LOI] = useState(0.0);
  let [Q17_LOI, setQ17_LOI] = useState(0.0);
  let [Q18_LOI, setQ18_LOI] = useState(0.0);

  let [R15_XRFtotal, setR15_XRFtotal] = useState(0.0);
  let [R16_XRFtotal, setR16_XRFtotal] = useState(0.0);
  let [R17_XRFtotal, setR17_XRFtotal] = useState(0.0);
  let [R18_XRFtotal, setR18_XRFtotal] = useState(0.0);

  //DONE
  //Material Setting TOTAL

  //DONE
  //XRF Analysis LOI

  //DONE
  //XRF Analysis TOTAL

  //DONE
  //RATIOS
  //fixed cell
  let [S15_LSF, setS15_LSF] = useState(0.0);
  let [S16_LSF, setS16_LSF] = useState(0.0);
  let [S17_LSF, setS17_LSF] = useState(0.0);
  let [S18_LSF, setS18_LSF] = useState(0.0);

  let [T15_HM, setT15_HM] = useState(0.0);
  let [T16_HM, setT16_HM] = useState(0.0);
  let [T17_HM, setT17_HM] = useState(0.0);
  let [T18_HM, setT18_HM] = useState(0.0);

  let [U15_SM, setU15_SM] = useState(0.0);
  let [U16_SM, setU16_SM] = useState(0.0);
  let [U17_SM, setU17_SM] = useState(0.0);
  let [U18_SM, setU18_SM] = useState(0.0);

  let [V15_AM, setV15_AM] = useState(0.0);
  let [V16_AM, setV16_AM] = useState(0.0);
  let [V17_AM, setV17_AM] = useState(0.0);
  let [V18_AM, setV18_AM] = useState(0.0);

  //DONE
  //LSF

  //DONE
  //HM

  //DONE
  //SM

  //DONE
  //AM

  //DONE
  //Limestome
  //D19
  let [D19_Limestome, setD19_Limestome] = useState(0.0);
  let [E19_Shale, setE19_Shale] = useState(0.0);
  let [F19_Sand, setF19_Sand] = useState(0.0);
  let [G19_Iron, setG19_Iron] = useState(0.0);

  let [D16_Limestome, setD16_Limestome] = useState(0);
  let [D17_Limestome, setD17_Limestome] = useState(0);
  let [D18_Limestome, setD18_Limestome] = useState(0);
  let [E16_Shale, setE16_Shale] = useState(0);
  let [E17_Shale, setE17_Shale] = useState(0);
  let [E18_Shale, setE18_Shale] = useState(0);
  let [F16_Sand, setF16_Sand] = useState(0);
  let [F17_Sand, setF17_Sand] = useState(0);
  let [F18_Sand, setF18_Sand] = useState(0);
  let [G16_Iron, setG16_Iron] = useState(0);
  let [G17_Iron, setG17_Iron] = useState(0);
  let [G18_Iron, setG18_Iron] = useState(0);

  //DONE
  //AVERAGE
  let [D20_AVG, setD20_AVG] = useState(0.0);
  let [E20_AVG, setE20_AVG] = useState(0.0);
  let [F20_AVG, setF20_AVG] = useState(0.0);
  let [G20_AVG, setG20_AVG] = useState(0.0);
  let [H20_AVG, setH20_AVG] = useState(0.0);
  let [I20_AVG, setI20_AVG] = useState(0.0);
  let [J20_AVG, setJ20_AVG] = useState(0.0);
  let [K20_AVG, setK20_AVG] = useState(0.0);
  let [L20_AVG, setL20_AVG] = useState(0.0);
  let [M20_AVG, setM20_AVG] = useState(0.0);
  let [N20_AVG, setN20_AVG] = useState(0.0);
  let [O20_AVG, setO20_AVG] = useState(0.0);
  let [P20_AVG, setP20_AVG] = useState(0.0);
  let [Q20_AVG, setQ20_AVG] = useState(0.0);
  let [R20_AVG, setR20_AVG] = useState(0.0);
  let [S20_AVG, setS20_AVG] = useState(0.0);
  let [T20_AVG, setT20_AVG] = useState(0.0);
  let [U20_AVG, setU20_AVG] = useState(0.0);
  let [V20_AVG, setV20_AVG] = useState(0.0);

  //DONE
  //STDEV
  let [D20_STDEV, setD20_STDEV] = useState(0.0);
  let [E20_STDEV, setE20_STDEV] = useState(0.0);
  let [F20_STDEV, setF20_STDEV] = useState(0.0);
  let [G20_STDEV, setG20_STDEV] = useState(0.0);
  let [H20_STDEV, setH20_STDEV] = useState(0.0);
  let [I20_STDEV, setI20_STDEV] = useState(0.0);
  let [J20_STDEV, setJ20_STDEV] = useState(0.0);
  let [K20_STDEV, setK20_STDEV] = useState(0.0);
  let [L20_STDEV, setL20_STDEV] = useState(0.0);
  let [M20_STDEV, setM20_STDEV] = useState(0.0);
  let [N20_STDEV, setN20_STDEV] = useState(0.0);
  let [O20_STDEV, setO20_STDEV] = useState(0.0);
  let [P20_STDEV, setP20_STDEV] = useState(0.0);
  let [Q20_STDEV, setQ20_STDEV] = useState(0.0);
  let [R20_STDEV, setR20_STDEV] = useState(0.0);
  let [S20_STDEV, setS20_STDEV] = useState(0.0);
  let [T20_STDEV, setT20_STDEV] = useState(0.0);
  let [U20_STDEV, setU20_STDEV] = useState(0.0);
  let [V20_STDEV, setV20_STDEV] = useState(0.0);

  //DONE
  // MIN
  let [D20_MIN, setD20_MIN] = useState(0.0);
  let [E20_MIN, setE20_MIN] = useState(0.0);
  let [F20_MIN, setF20_MIN] = useState(0.0);
  let [G20_MIN, setG20_MIN] = useState(0.0);
  let [H20_MIN, setH20_MIN] = useState(0.0);
  let [I20_MIN, setI20_MIN] = useState(0.0);
  let [J20_MIN, setJ20_MIN] = useState(0.0);
  let [K20_MIN, setK20_MIN] = useState(0.0);
  let [L20_MIN, setL20_MIN] = useState(0.0);
  let [M20_MIN, setM20_MIN] = useState(0.0);
  let [N20_MIN, setN20_MIN] = useState(0.0);
  let [O20_MIN, setO20_MIN] = useState(0.0);
  let [P20_MIN, setP20_MIN] = useState(0.0);
  let [Q20_MIN, setQ20_MIN] = useState(0.0);
  let [R20_MIN, setR20_MIN] = useState(0.0);
  let [S20_MIN, setS20_MIN] = useState(0.0);
  let [T20_MIN, setT20_MIN] = useState(0.0);
  let [U20_MIN, setU20_MIN] = useState(0.0);
  let [V20_MIN, setV20_MIN] = useState(0.0);

  //DONE
  //MAX
  let [D20_MAX, setD20_MAX] = useState(0.0);
  let [E20_MAX, setE20_MAX] = useState(0.0);
  let [F20_MAX, setF20_MAX] = useState(0.0);
  let [G20_MAX, setG20_MAX] = useState(0.0);
  let [H20_MAX, setH20_MAX] = useState(0.0);
  let [I20_MAX, setI20_MAX] = useState(0.0);
  let [J20_MAX, setJ20_MAX] = useState(0.0);
  let [K20_MAX, setK20_MAX] = useState(0.0);
  let [L20_MAX, setL20_MAX] = useState(0.0);
  let [M20_MAX, setM20_MAX] = useState(0.0);
  let [N20_MAX, setN20_MAX] = useState(0.0);
  let [O20_MAX, setO20_MAX] = useState(0.0);
  let [P20_MAX, setP20_MAX] = useState(0.0);
  let [Q20_MAX, setQ20_MAX] = useState(0.0);
  let [R20_MAX, setR20_MAX] = useState(0.0);
  let [S20_MAX, setS20_MAX] = useState(0.0);
  let [T20_MAX, setT20_MAX] = useState(0.0);
  let [U20_MAX, setU20_MAX] = useState(0.0);
  let [V20_MAX, setV20_MAX] = useState(0.0);

  //END NAME: RAW MILL 2

  //***************************************************** */

  //DONE
  //START NAME: INPUT VARIABLES

  //PRIORITY
  //CAN BE CHANGE
  let [C30_LSF_PR, setC30_LSF_PR] = useState(0.0);
  let [C31_SM_PR, setC31_SM_PR] = useState(0.0);
  let [C32_AM_PR, setC32_AM_PR] = useState(0.0);
  //TARGET
  //CAN BE CHANGE
  let [F30_LSF_TG, setF30_LSF_TG] = useState(0.0);
  let [F31_SM_TG, setF31_SM_TG] = useState(0.0);
  let [F32_AM_TG, setF32_AM_TG] = useState(0.0);
  //CLINKER FACTOR
  //CAN BE CHANGE
  let [E33_Clinker_Factor, setE33_Clinker_Factor] = useState(0.0);
  let [E34_RawMixType, setE34_RawMixType] = useState("");

  //END NAME: INPUT VARIABLES

  //***************************************************** */

  //DONE
  //START NAME: RAWMEAL and CLINKER TARGETS

  //Target Rawmeal Composition
  //can be change
  let [H31_SiO2, setH31_SiO2] = useState(0.0);
  let [I31_Al2O3, setI31_Al2O3] = useState(0.0);
  let [J31_Fe2O3, setJ31_Fe2O3] = useState(0.0);
  let [K31_CaO, setK31_CaO] = useState(0.0);
  let [L31_MgO, setL31_MgO] = useState(0.0);
  let [M31_Na2O, setM31_Na2O] = useState(0.0);
  let [N31_K2O, setN31_K2O] = useState(0.0);
  let [O31_SO3, setO31_SO3] = useState(0.0);
  let [P31_Cl, setP31_Cl] = useState(0.0);

  //fixed cell
  let [Q31_LOI, setQ31_LOI] = useState(0.0);
  let [R31_total, setR31_total] = useState(0.0);
  let [S31_LSF, setS31_LSF] = useState(0.0);
  let [T31_HM, setT31_HM] = useState(0.0);
  let [U31_SM, setU31_SM] = useState(0.0);
  let [V31_AM, setV31_AM] = useState(0.0);

  //DONE
  //Expected  Clinker Composition

  //fixed cell
  let [H35_SiO2, setH35_SiO2] = useState(0.0);
  let [I35_Al2O3, setI35_Al2O3] = useState(0.0);
  let [J35_Fe2O3, setJ35_Fe2O3] = useState(0.0);
  let [K35_CaO, setK35_CaO] = useState(0.0);
  let [L35_MgO, setL35_MgO] = useState(0.0);
  let [M35_Na2O, setM35_Na2O] = useState(0.0);
  let [N35_K2O, setN35_K2O] = useState(0.0);
  let [O35_SO3, setO35_SO3] = useState(0.0);
  let [P35_Cl, setP35_Cl] = useState(0.0);
  let [Q35_ECC_total, setQ35_ECC_total] = useState(0.0);
  let [S35_LSF, setS35_LSF] = useState(0.0);
  let [T35_HM, setT35_HM] = useState(0.0);
  let [U35_SM, setU35_SM] = useState(0.0);
  let [V35_AM, setV35_AM] = useState(0.0);
  //Fixed cell

  let [H38_literKG, setH38_literKG] = useState(0.0);
  let [I38_FCaO, setI38_FCaO] = useState(0.0);
  let [J38_BurningCondition, setJ38_BurningCondition] = useState(0.0);
  let [L38_KL_LOI, setL38_KL_LOI] = useState(0.0);
  let [U38_SO3, setU38_SO3] = useState(0.0);
  let [V38_LOI, setV38_LOI] = useState(0.0);

  //END NAME: RAWMEAL and CLINKER TARGETS

  let [K38_DOC, setK38_DOC] = useState(0.0);
  let [M38_C3Snet, setM38_C3Snet] = useState(0.0);
  let [N38_C2S, setN38_C2S] = useState(0.0);
  let [O38_C3A, setO38_C3A] = useState(0.0);
  let [P38_C4AF, setP38_C4AF] = useState(0.0);
  let [Q38_Sulfur_Alkali_ratio, setQ38_Sulfur_Alkali_ratio] = useState(0.0);
  let [R38_total_Alkali, setR38_total_Alkali] = useState(0.0);
  let [S38_Liquid_Phase, setS38_Liquid_Phase] = useState(0.0);
  let [T38_Coating_Index, setT38_Coating_Index] = useState(0.0);

  let [result_total_C15, setResult_total_C15] = useState(0);
  let [resulttotal_C16, setResulttotal_C16] = useState(0);
  let [resulttotal_C17, setResulttotal_C17] = useState(0);
  let [resulttotal_C18, setResulttotal_C18] = useState(0);
  let [resulttotal_C19, setResulttotal_C19] = useState(0);

  // *********RAWMILL D FOUR COMPONENTS ****************/
  let [C8_MIX_RDFC, setC8_MIX_RDFC] = useState(0.0);
  let [C9_SiO2_RDFC, setC9_SiO2_RDFC] = useState(0.0);
  let [C10_Al2O3_RDFC, setC10_Al2O3_RDFC] = useState(0.0);
  let [C11_Fe2O3_RDFC, setC11_Fe2O3_RDFC] = useState(0.0);
  let [C12_CaO_RDFC, setC12_CaO_RDFC] = useState(0.0);
  let [C13_MgO_RDFC, setC13_MgO_RDFC] = useState(0.0);
  let [C14_Na2O_RDFC, setC14_Na2O_RDFC] = useState(0.0);
  let [C15_K2O_RDFC, setC15_K2O_RDFC] = useState(0.0);
  let [C16_SO3_RDFC, setC16_SO3_RDFC] = useState(0.0);
  let [C17_LOI_RDFC, setC17_LOI_RDFC] = useState(0.0);
  let [C18_TOTAL_RDFC, setC18_TOTAL_RDFC] = useState(0.0);
  let [C19_LSF_RDFC, setC19_LSF_RDFC] = useState(0.0);
  let [C20_SM_RDFC, setC20_SM_RDFC] = useState(0.0);
  let [C21_AM_RDFC, setC21_AM_RDFC] = useState(0.0);

  let [D8_MIX_RDFC, setD8_MIX_RDFC] = useState(0.0);
  let [D9_SiO2_RDFC, setD9_SiO2_RDFC] = useState(0.0);
  let [D10_Al2O3_RDFC, setD10_Al2O3_RDFC] = useState(0.0);
  let [D11_Fe2O3_RDFC, setD11_Fe2O3_RDFC] = useState(0.0);
  let [D12_CaO_RDFC, setD12_CaO_RDFC] = useState(0.0);
  let [D13_MgO_RDFC, setD13_MgO_RDFC] = useState(0.0);
  let [D14_Na2O_RDFC, setD14_Na2O_RDFC] = useState(0.0);
  let [D15_K2O_RDFC, setD15_K2O_RDFC] = useState(0.0);
  let [D16_SO3_RDFC, setD16_SO3_RDFC] = useState(0.0);
  let [D17_LOI_RDFC, setD17_LOI_RDFC] = useState(0.0);
  let [D18_TOTAL_RDFC, setD18_TOTAL_RDFC] = useState(0.0);
  let [D19_LSF_RDFC, setD19_LSF_RDFC] = useState(0.0);
  let [D20_SM_RDFC, setD20_SM_RDFC] = useState(0.0);
  let [D21_AM_RDFC, setD21_AM_RDFC] = useState(0.0);

  let [E8_MIX_RDFC, setE8_MIX_RDFC] = useState(0.0);
  let [E9_SiO2_RDFC, setE9_SiO2_RDFC] = useState(0.0);
  let [E10_Al2O3_RDFC, setE10_Al2O3_RDFC] = useState(0.0);
  let [E11_Fe2O3_RDFC, setE11_Fe2O3_RDFC] = useState(0.0);
  let [E12_CaO_RDFC, setE12_CaO_RDFC] = useState(0.0);
  let [E13_MgO_RDFC, setE13_MgO_RDFC] = useState(0.0);
  let [E14_Na2O_RDFC, setE14_Na2O_RDFC] = useState(0.0);
  let [E15_K2O_RDFC, setE15_K2O_RDFC] = useState(0.0);
  let [E16_SO3_RDFC, setE16_SO3_RDFC] = useState(0.0);
  let [E17_LOI_RDFC, setE17_LOI_RDFC] = useState(0.0);
  let [E18_TOTAL_RDFC, setE18_TOTAL_RDFC] = useState(0.0);
  let [E19_LSF_RDFC, setE19_LSF_RDFC] = useState(0.0);
  let [E20_SM_RDFC, setE20_SM_RDFC] = useState(0.0);
  let [E21_AM_RDFC, setE21_AM_RDFC] = useState(0.0);

  let [F8_MIX_RDFC, setF8_MIX_RDFC] = useState(0.0);
  let [F9_SiO2_RDFC, setF9_SiO2_RDFC] = useState(0.0);
  let [F10_Al2O3_RDFC, setF10_Al2O3_RDFC] = useState(0.0);
  let [F11_Fe2O3_RDFC, setF11_Fe2O3_RDFC] = useState(0.0);
  let [F12_CaO_RDFC, setF12_CaO_RDFC] = useState(0.0);
  let [F13_MgO_RDFC, setF13_MgO_RDFC] = useState(0.0);
  let [F14_Na2O_RDFC, setF14_Na2O_RDFC] = useState(0.0);
  let [F15_K2O_RDFC, setF15_K2O_RDFC] = useState(0.0);
  let [F16_SO3_RDFC, setF16_SO3_RDFC] = useState(0.0);
  let [F17_LOI_RDFC, setF17_LOI_RDFC] = useState(0.0);
  let [F18_TOTAL_RDFC, setF18_TOTAL_RDFC] = useState(0.0);
  let [F19_LSF_RDFC, setF19_LSF_RDFC] = useState(0.0);
  let [F20_SM_RDFC, setF20_SM_RDFC] = useState(0.0);
  let [F21_AM_RDFC, setF21_AM_RDFC] = useState(0.0);

  let [G8_MIX_RDFC, setG8_MIX_RDFC] = useState(0.0);
  let [G9_SiO2_RDFC, setG9_SiO2_RDFC] = useState(0.0);
  let [G10_Al2O3_RDFC, setG10_Al2O3_RDFC] = useState(0.0);
  let [G11_Fe2O3_RDFC, setG11_Fe2O3_RDFC] = useState(0.0);
  let [G12_CaO_RDFC, setG12_CaO_RDFC] = useState(0.0);
  let [G13_MgO_RDFC, setG13_MgO_RDFC] = useState(0.0);
  let [G14_Na2O_RDFC, setG14_Na2O_RDFC] = useState(0.0);
  let [G15_K2O_RDFC, setG15_K2O_RDFC] = useState(0.0);
  let [G16_SO3_RDFC, setG16_SO3_RDFC] = useState(0.0);
  let [G17_LOI_RDFC, setG17_LOI_RDFC] = useState(0.0);
  let [G18_TOTAL_RDFC, setG18_TOTAL_RDFC] = useState(0.0);
  let [G19_LSF_RDFC, setG19_LSF_RDFC] = useState(0.0);
  let [G20_SM_RDFC, setG20_SM_RDFC] = useState(0.0);
  let [G21_AM_RDFC, setG21_AM_RDFC] = useState(0.0);

  //DATE
  let [I7_Date, setI7_Date] = useState("");

  //RAWMEAL
  //TARGET

  //Input
  //Lime Saturation
  let [I14_Lime_Saturation, setI14_Lime_Saturation] = useState(0.0);

  //Silica_Modulus
  let [I17_Silica_Modulus, setI17_Silica_Modulus] = useState(0.0);

  //Alumina_Modulus
  let [I20_Alumina_Modulus, setI20_Alumina_Modulus] = useState(0.0);

  //   COEFFICIENTS
  //all fix cell
  let [L8_a, setL8_a] = useState(0.0);
  let [L9_b, setL9_b] = useState(0.0);
  let [L10_c, setL10_c] = useState(0.0);
  let [L11_d, setL11_d] = useState(0.0);
  let [L12_e, setL12_e] = useState(0.0);
  let [L13_f, setL13_f] = useState(0.0);
  let [L14_g, setL14_g] = useState(0.0);
  let [L15_h, setL15_h] = useState(0.0);
  let [L16_i, setL16_i] = useState(0.0);
  let [L17_k, setL17_k] = useState(0.0);
  let [L18_l, setL18_l] = useState(0.0);
  let [L19_m, setL19_m] = useState(0.0);
  let [L20_n, setL20_n] = useState(0.0);
  let [L21_p, setL21_p] = useState(0.0);
  let [L22_q, setL22_q] = useState(0.0);
  let [L23_r, setL23_r] = useState(0.0);
  let [L24_s, setL24_s] = useState(0.0);

  //fixed cell
  //MATRIX DETERMINANTS

  let [O8_Dw_Matrix, setO8_Dw_Matrix] = useState(0.0);
  let [O9_Dx_Matrix, setO9_Dx_Matrix] = useState(0.0);
  let [O10_Dy_Matrix, setO10_Dy_Matrix] = useState(0.0);
  let [O11_Dz_Matrix, setO11_Dz_Matrix] = useState(0.0);
  let [O12_D_Matrix, setO12_D_Matrix] = useState(0.0);

  //RAW MATERIALS %

  let [O15_W, setO15_W] = useState(0.0);
  let [O16_X, setO16_X] = useState(0.0);
  let [O17_Y, setO17_Y] = useState(0.0);
  let [O18_Z, setO18_Z] = useState(0.0);
  let [O19_TOTAL, setO19_TOTAL] = useState(0.0);

  //START functions and formulas

  //MIX

  //***************** */ START SQLITE
  //CREATE TABLE IF NOT EXISTS

  const [dataList2, setDataList2] = useState([]);
  // ***********END RAWMILL D FOUR COMPONENTS ***********

  const compute_total_C15 = () => {
    D15 = isNaN(parseFloat(D15)) ? 0.0 : parseFloat(D15);
    E15 = isNaN(parseFloat(E15)) ? 0.0 : parseFloat(E15);
    F15 = isNaN(parseFloat(F15)) ? 0.0 : parseFloat(F15);
    G15 = isNaN(parseFloat(G15)) ? 0.0 : parseFloat(G15);

    total_C15 = D15 + E15 + F15 + G15;
    setResult_total_C15(total_C15.toFixed(0));
  };
  // end total_C15

  // begin total_C16

  const compute_total_C16 = () => {
    D16_Limestome = isNaN(parseFloat(D16_Limestome))
      ? 0.0
      : parseFloat(D16_Limestome);
    E16_Shale = isNaN(parseFloat(E16_Shale)) ? 0.0 : parseFloat(E16_Shale);
    F16_Sand = isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand);
    G16_Iron = isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron);

    total_C16 = D16_Limestome + E16_Shale + F16_Sand + G16_Iron;
    setResulttotal_C16(total_C16.toFixed(0));
  };
  // end total_C16

  // begin total_C17

  const compute_total_C17 = () => {
    D17_Limestome = isNaN(parseFloat(D17_Limestome))
      ? 0.0
      : parseFloat(D17_Limestome);
    E17_Shale = isNaN(parseFloat(E17_Shale)) ? 0.0 : parseFloat(E17_Shale);
    F17_Sand = isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand);
    G17_Iron = isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron);
    total_C17 = D17_Limestome + E17_Shale + F17_Sand + G17_Iron;
    setResulttotal_C17(total_C17.toFixed(0));
  };
  // end total_C17

  // begin total_C18

  const compute_total_C18 = () => {
    D18_Limestome = isNaN(parseFloat(D18_Limestome))
      ? 0.0
      : parseFloat(D18_Limestome);
    E18_Shale = isNaN(parseFloat(E18_Shale)) ? 0.0 : parseFloat(E18_Shale);
    F18_Sand = isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand);
    G18_Iron = isNaN(parseFloat(G18_Iron)) ? 0.0 : parseFloat(G18_Iron);
    total_C18 = D18_Limestome + E18_Shale + F18_Sand + G18_Iron;
    setResulttotal_C18(total_C18.toFixed(0));
  };
  // end total_C18

  // begin total_C19

  const compute_total_C19 = () => {
    D19_Limestome = isNaN(parseFloat(D19_Limestome))
      ? 0.0
      : parseFloat(D19_Limestome);
    E19_Shale = isNaN(parseFloat(E19_Shale)) ? 0.0 : parseFloat(E19_Shale);
    F19_Sand = isNaN(parseFloat(F19_Sand)) ? 0.0 : parseFloat(F19_Sand);
    G19_Iron = isNaN(parseFloat(G19_Iron)) ? 0.0 : parseFloat(G19_Iron);
    total_C19 = D19_Limestome + E19_Shale + F19_Sand + G19_Iron;
    setResulttotal_C19(total_C19.toFixed(0));
  };
  // end total_C19

  // begin XRF Analysis LOI Q_LOI

  const compute_Q15_LOI = () => {
    K15_CaO = isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO);
    L15_MgO = isNaN(parseFloat(L15_MgO)) ? 0.0 : parseFloat(L15_MgO);
    Q15_LOI = 0.786 * K15_CaO + 1.1 * L15_MgO + 0.2;

    setQ15_LOI(Q15_LOI.toFixed(2));
  };

  const compute_Q16_LOI = () => {
    K16_CaO = isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO);
    L16_MgO = isNaN(parseFloat(L16_MgO)) ? 0.0 : parseFloat(L16_MgO);
    Q16_LOI = 0.786 * K16_CaO + 1.1 * L16_MgO + 0.2;

    setQ16_LOI(Q16_LOI.toFixed(2));
  };
  const compute_Q17_LOI = () => {
    K17_CaO = isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO);
    L17_MgO = isNaN(parseFloat(L17_MgO)) ? 0.0 : parseFloat(L17_MgO);
    Q17_LOI = 0.786 * K17_CaO + 1.1 * L17_MgO + 0.2;

    setQ17_LOI(Q17_LOI.toFixed(2));
  };
  const compute_Q18_LOI = () => {
    K18_CaO = isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO);
    L18_MgO = isNaN(parseFloat(L18_MgO)) ? 0.0 : parseFloat(L18_MgO);
    Q18_LOI = 0.786 * K18_CaO + 1.1 * L18_MgO + 0.2;

    setQ18_LOI(Q18_LOI.toFixed(2));
  };
  // end XRF Analysis LOI Q_LOI

  //begin XRF Total

  const compute_R15_XRFtotal = () => {
    H15_SiO2 = isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2);
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    K15_CaO = isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO);
    L15_MgO = isNaN(parseFloat(L15_MgO)) ? 0.0 : parseFloat(L15_MgO);
    M15_Na2O = isNaN(parseFloat(M15_Na2O)) ? 0.0 : parseFloat(M15_Na2O);
    N15_K2O = isNaN(parseFloat(N15_K2O)) ? 0.0 : parseFloat(N15_K2O);
    O15_SO3 = isNaN(parseFloat(O15_SO3)) ? 0.0 : parseFloat(O15_SO3);
    P15_Cl = isNaN(parseFloat(P15_Cl)) ? 0.0 : parseFloat(P15_Cl);
    Q15_LOI = isNaN(parseFloat(Q15_LOI)) ? 0.0 : parseFloat(Q15_LOI);

    R15_XRFtotal =
      H15_SiO2 +
      I15_Al2O3 +
      J15_Fe2O3 +
      K15_CaO +
      L15_MgO +
      M15_Na2O +
      N15_K2O +
      O15_SO3 +
      P15_Cl +
      Q15_LOI;
    setR15_XRFtotal(R15_XRFtotal.toFixed(2));
  };
  const compute_R16_XRFtotal = () => {
    H16_SiO2 = isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2);
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    K16_CaO = isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO);
    L16_MgO = isNaN(parseFloat(L16_MgO)) ? 0.0 : parseFloat(L16_MgO);
    M16_Na2O = isNaN(parseFloat(M16_Na2O)) ? 0.0 : parseFloat(M16_Na2O);
    N16_K2O = isNaN(parseFloat(N16_K2O)) ? 0.0 : parseFloat(N16_K2O);
    O16_SO3 = isNaN(parseFloat(O16_SO3)) ? 0.0 : parseFloat(O16_SO3);
    P16_Cl = isNaN(parseFloat(P16_Cl)) ? 0.0 : parseFloat(P16_Cl);
    Q16_LOI = isNaN(parseFloat(Q16_LOI)) ? 0.0 : parseFloat(Q16_LOI);
    R16_XRFtotal =
      H16_SiO2 +
      I16_Al2O3 +
      J16_Fe2O3 +
      K16_CaO +
      L16_MgO +
      M16_Na2O +
      N16_K2O +
      O16_SO3 +
      P16_Cl +
      Q16_LOI;

    setR16_XRFtotal(R16_XRFtotal.toFixed(2));
  };
  const compute_R17_XRFtotal = () => {
    H17_SiO2 = isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2);
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    K17_CaO = isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO);
    L17_MgO = isNaN(parseFloat(L17_MgO)) ? 0.0 : parseFloat(L17_MgO);
    M17_Na2O = isNaN(parseFloat(M17_Na2O)) ? 0.0 : parseFloat(M17_Na2O);
    N17_K2O = isNaN(parseFloat(N17_K2O)) ? 0.0 : parseFloat(N17_K2O);
    O17_SO3 = isNaN(parseFloat(O17_SO3)) ? 0.0 : parseFloat(O17_SO3);
    P17_Cl = isNaN(parseFloat(P17_Cl)) ? 0.0 : parseFloat(P17_Cl);
    Q17_LOI = isNaN(parseFloat(Q17_LOI)) ? 0.0 : parseFloat(Q17_LOI);
    R17_XRFtotal =
      H17_SiO2 +
      I17_Al2O3 +
      J17_Fe2O3 +
      K17_CaO +
      L17_MgO +
      M17_Na2O +
      N17_K2O +
      O17_SO3 +
      P17_Cl +
      Q17_LOI;

    setR17_XRFtotal(R17_XRFtotal.toFixed(2));
  };
  const compute_R18_XRFtotal = () => {
    H18_SiO2 = isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2);
    I18_Al2O3 = isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3);
    J18_Fe2O3 = isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3);
    K18_CaO = isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO);
    L18_MgO = isNaN(parseFloat(L18_MgO)) ? 0.0 : parseFloat(L18_MgO);
    M18_Na2O = isNaN(parseFloat(M18_Na2O)) ? 0.0 : parseFloat(M18_Na2O);
    N18_K2O = isNaN(parseFloat(N18_K2O)) ? 0.0 : parseFloat(N18_K2O);
    O18_SO3 = isNaN(parseFloat(O18_SO3)) ? 0.0 : parseFloat(O18_SO3);
    P18_Cl = isNaN(parseFloat(P18_Cl)) ? 0.0 : parseFloat(P18_Cl);
    Q18_LOI = isNaN(parseFloat(Q18_LOI)) ? 0.0 : parseFloat(Q18_LOI);
    R18_XRFtotal =
      H18_SiO2 +
      I18_Al2O3 +
      J18_Fe2O3 +
      K18_CaO +
      L18_MgO +
      M18_Na2O +
      N18_K2O +
      O18_SO3 +
      P18_Cl +
      Q18_LOI;

    setR18_XRFtotal(R18_XRFtotal.toFixed(2));
  };

  //end XRF Total

  //begin Ratio Total
  //LSF
  const compute_S15_LSF_ratio = () => {
    K15_CaO = isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO);
    H15_SiO2 = isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2);
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    S15_LSF =
      (K15_CaO * 100) / (2.8 * H15_SiO2 + 1.2 * I15_Al2O3 + 0.65 * J15_Fe2O3);

    setS15_LSF(S15_LSF.toFixed(2));
  };

  const compute_S16_LSF_ratio = () => {
    K16_CaO = isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO);
    H16_SiO2 = isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2);
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    S16_LSF =
      (K16_CaO | H16_SiO2 | I16_Al2O3 | J16_Fe2O3) <= 0
        ? 0.0
        : (K16_CaO * 100) /
          (2.8 * H16_SiO2 + 1.2 * I16_Al2O3 + 0.65 * J16_Fe2O3);

    setS16_LSF(S16_LSF.toFixed(2));
  };

  const compute_S17_LSF_ratio = () => {
    K17_CaO = isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO);
    H17_SiO2 = isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2);
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    S17_LSF =
      (K17_CaO | H17_SiO2 | I17_Al2O3 | J17_Fe2O3) <= 0
        ? 0.0
        : (K17_CaO * 100) /
          (2.8 * H17_SiO2 + 1.2 * I17_Al2O3 + 0.65 * J17_Fe2O3);

    setS17_LSF(S17_LSF.toFixed(2));
  };

  const compute_S18_LSF_ratio = () => {
    K18_CaO = isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO);
    H18_SiO2 = isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2);
    I18_Al2O3 = isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3);
    J18_Fe2O3 = isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3);
    S18_LSF =
      (K18_CaO * 100) / (2.8 * H18_SiO2 + 1.2 * I18_Al2O3 + 0.65 * J18_Fe2O3);

    setS18_LSF(S18_LSF.toFixed(2));
  };

  // HM
  const compute_T15_HM_ratio = () => {
    K15_CaO = isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO);
    H15_SiO2 = isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2);
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    T15_HM = K15_CaO / (H15_SiO2 + I15_Al2O3 + J15_Fe2O3);

    setT15_HM(T15_HM.toFixed(2));
  };
  const compute_T16_HM_ratio = () => {
    K16_CaO = isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO);
    H16_SiO2 = isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2);
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    T16_HM = K16_CaO / (H16_SiO2 + I16_Al2O3 + J16_Fe2O3);

    setT16_HM(T16_HM.toFixed(2));
  };
  const compute_T17_HM_ratio = () => {
    K17_CaO = isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO);
    H17_SiO2 = isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2);
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    T17_HM = K17_CaO / (H17_SiO2 + I17_Al2O3 + J17_Fe2O3);

    setT17_HM(T17_HM.toFixed(2));
  };
  const compute_T18_HM_ratio = () => {
    K18_CaO = isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO);
    H18_SiO2 = isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2);
    I18_Al2O3 = isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3);
    J18_Fe2O3 = isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3);
    T18_HM = K18_CaO / (H18_SiO2 + I18_Al2O3 + J18_Fe2O3);

    setT18_HM(T18_HM.toFixed(2));
  };

  //SM
  const compute_U15_SM_ratio = () => {
    H15_SiO2 = isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2);
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    U15_SM = H15_SiO2 / (I15_Al2O3 + J15_Fe2O3);

    setU15_SM(U15_SM.toFixed(2));
  };
  const compute_U16_SM_ratio = () => {
    H16_SiO2 = isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2);
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    U16_SM = H16_SiO2 / (I16_Al2O3 + J16_Fe2O3);

    setU16_SM(U16_SM.toFixed(2));
  };
  const compute_U17_SM_ratio = () => {
    H17_SiO2 = isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2);
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    U17_SM = H17_SiO2 / (I17_Al2O3 + J17_Fe2O3);

    setU17_SM(U17_SM.toFixed(2));
  };
  const compute_U18_SM_ratio = () => {
    H18_SiO2 = isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2);
    I18_Al2O3 = isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3);
    J18_Fe2O3 = isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3);
    U18_SM = H18_SiO2 / (I18_Al2O3 + J18_Fe2O3);

    setU18_SM(U18_SM.toFixed(2));
  };

  //AM
  const compute_V15_AM_ratio = () => {
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    V15_AM = I15_Al2O3 / J15_Fe2O3;

    setV15_AM(V15_AM.toFixed(2));
  };
  const compute_V16_AM_ratio = () => {
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    V16_AM = I16_Al2O3 / J16_Fe2O3;

    setV16_AM(V16_AM.toFixed(2));
  };
  const compute_V17_AM_ratio = () => {
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    V17_AM = I17_Al2O3 / J17_Fe2O3;

    setV17_AM(V17_AM.toFixed(2));
  };
  const compute_V18_AM_ratio = () => {
    I18_Al2O3 = isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3);
    J18_Fe2O3 = isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3);
    V18_AM = I18_Al2O3 / J18_Fe2O3;

    setV18_AM(V18_AM.toFixed(2));
  };

  //end Ratio Total

  //Material Setting Elements
  //F30 C30
  const compute_D19_Limestome = () => {
    D18_Limestome = isNaN(parseFloat(D18_Limestome))
      ? 0.0
      : parseFloat(D18_Limestome);
    F30_LSF_TG = isNaN(parseFloat(F30_LSF_TG)) ? 0.0 : parseFloat(F30_LSF_TG);
    S18_LSF = isNaN(parseFloat(S18_LSF)) ? 0.0 : parseFloat(S18_LSF);
    C30_LSF_PR = isNaN(parseFloat(C30_LSF_PR)) ? 0.0 : parseFloat(C30_LSF_PR);

    D19_Limestome = D18_Limestome + (F30_LSF_TG - S18_LSF) * C30_LSF_PR * 1.3;

    setD19_Limestome(D19_Limestome.toFixed(1));
  };

  //has value > 0 trigger
  const compute_E19_Shale = () => {
    F19_Sand = isNaN(parseFloat(F19_Sand)) ? 0.0 : parseFloat(F19_Sand);
    G19_Iron = isNaN(parseFloat(G19_Iron)) ? 0.0 : parseFloat(G19_Iron);
    D19_Limestome = isNaN(parseFloat(D19_Limestome))
      ? 0.0
      : parseFloat(D19_Limestome);
    E19_Shale = 100 - F19_Sand - G19_Iron - D19_Limestome;
    setE19_Shale(E19_Shale.toFixed(1));
  };

  //F31 C31, if U18 has value run func
  const compute_F19_Sand = () => {
    F18_Sand = isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand);
    F31_SM_TG = isNaN(parseFloat(F31_SM_TG)) ? 0.0 : parseFloat(F31_SM_TG);
    U18_SM = isNaN(parseFloat(U18_SM)) ? 0.0 : parseFloat(U18_SM);
    C31_SM_PR = isNaN(parseFloat(C31_SM_PR)) ? 0.0 : parseFloat(C31_SM_PR);

    F19_Sand = F18_Sand + (F31_SM_TG - U18_SM) * C31_SM_PR * 1.3;

    setF19_Sand(F19_Sand.toFixed(1));
  };
  //F31 C31, if U18 has value run func
  const compute_G19_Iron = () => {
    G17_Iron = isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron);
    F32_AM_TG = isNaN(parseFloat(F32_AM_TG)) ? 0.0 : parseFloat(F32_AM_TG);
    V17_AM = isNaN(parseFloat(V17_AM)) ? 0.0 : parseFloat(V17_AM);
    C32_AM_PR = isNaN(parseFloat(C32_AM_PR)) ? 0.0 : parseFloat(C32_AM_PR);

    G19_Iron = G18_Iron + (F32_AM_TG - V18_AM) * C32_AM_PR * 1.3;
    setG19_Iron(G19_Iron.toFixed(1));
  };
  // *************************************

  //getback
  //F30_LSF_TG, C30_LSF_PR
  const compute_D16_Limestome = () => {
    E16_Shale = isNaN(parseFloat(E16_Shale)) ? 0.0 : parseFloat(E16_Shale);
    F16_Sand = isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand);
    G16_Iron = isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron);
    // D15 = isNaN(parseFloat(D15)) ? 0.0 : parseFloat(D15);
    // F30_LSF_TG = isNaN(parseFloat(F30_LSF_TG)) ? 0.0 : parseFloat(F30_LSF_TG);
    // S15_LSF = isNaN(parseFloat(S15_LSF)) ? 0.0 : parseFloat(S15_LSF);
    // C30_LSF_PR = isNaN(parseFloat(C30_LSF_PR)) ? 0.0 : parseFloat(C30_LSF_PR);

    // D16_Limestome = D15 + (F30_LSF_TG - S15_LSF) * C30_LSF_PR * 1.3;
    D16_Limestome = 100 - E16_Shale - F16_Sand - G16_Iron;

    setD16_Limestome(D16_Limestome.toFixed(1));
  };

  //getback
  //F30_LSF_TG, C30_LSF_PR
  const compute_D17_Limestome = () => {
    E17_Shale = isNaN(parseFloat(E17_Shale)) ? 0.0 : parseFloat(E17_Shale);
    F17_Sand = isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand);
    G17_Iron = isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron);
    // D16_Limestome = isNaN(parseFloat(D16_Limestome))
    //   ? 0.0
    //   : parseFloat(D16_Limestome);
    // F30_LSF_TG = isNaN(parseFloat(F30_LSF_TG)) ? 0.0 : parseFloat(F30_LSF_TG);
    // S16_LSF = isNaN(parseFloat(S16_LSF)) ? 0.0 : parseFloat(S16_LSF);
    // C30_LSF_PR = isNaN(parseFloat(C30_LSF_PR)) ? 0.0 : parseFloat(C30_LSF_PR);

    // D17_Limestome = D16_Limestome + (F30_LSF_TG - S16_LSF) * C30_LSF_PR * 1.3;
    D17_Limestome = 100 - E17_Shale - F17_Sand - G17_Iron;

    setD17_Limestome(D17_Limestome.toFixed(1));
  };

  //getback
  //F30_LSF_TG, C30_LSF_PR
  const compute_D18_Limestome = () => {
    E18_Shale = isNaN(parseFloat(E18_Shale)) ? 0.0 : parseFloat(E18_Shale);
    F18_Sand = isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand);
    G18_Iron = isNaN(parseFloat(G18_Iron)) ? 0.0 : parseFloat(G18_Iron);
    // D17_Limestome = isNaN(parseFloat(D17_Limestome))
    //   ? 0.0
    //   : parseFloat(D17_Limestome);
    // F30_LSF_TG = isNaN(parseFloat(F30_LSF_TG)) ? 0.0 : parseFloat(F30_LSF_TG);
    // S17_LSF = isNaN(parseFloat(S17_LSF)) ? 0.0 : parseFloat(S17_LSF);
    // C30_LSF_PR = isNaN(parseFloat(C30_LSF_PR)) ? 0.0 : parseFloat(C30_LSF_PR);

    // D18_Limestome = D17_Limestome + (F30_LSF_TG - S17_LSF) * C30_LSF_PR * 1.3;
    D18_Limestome = 100 - E18_Shale - F18_Sand - G18_Iron;

    setD18_Limestome(D18_Limestome.toFixed(1));
  };

  const compute_E16_Shale = () => {
    E15 = isNaN(parseFloat(E15)) ? 0.0 : parseFloat(E15);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    // F16_Sand = isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand);
    // G16_Iron = isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron);
    // D16_Limestome = isNaN(parseFloat(D16_Limestome))
    //   ? 0.0
    //   : parseFloat(D16_Limestome);

    // E16_Shale = 100 - F16_Sand - G16_Iron - D16_Limestome;
    E16_Shale = E15 + I31_Al2O3 - I15_Al2O3;

    setE16_Shale(E16_Shale.toFixed(1));
  };

  const compute_E17_Shale = () => {
    E16_Shale = isNaN(parseFloat(E16_Shale)) ? 0.0 : parseFloat(E16_Shale);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    // F17_Sand = isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand);
    // G17_Iron = isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron);
    // D17_Limestome = isNaN(parseFloat(D17_Limestome))
    //   ? 0.0
    //   : parseFloat(D17_Limestome);

    // E17_Shale = 100 - F17_Sand - G17_Iron - D17_Limestome;
    E17_Shale = E16_Shale + I31_Al2O3 - I16_Al2O3;

    setE17_Shale(E17_Shale.toFixed(1));
  };

  const compute_E18_Shale = () => {
    E17_Shale = isNaN(parseFloat(E17_Shale)) ? 0.0 : parseFloat(E17_Shale);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    // F18_Sand = isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand);
    // G18_Iron = isNaN(parseFloat(G18_Iron)) ? 0.0 : parseFloat(G18_Iron);
    // D18_Limestome = isNaN(parseFloat(D18_Limestome))
    //   ? 0.0
    //   : parseFloat(D18_Limestome);

    // E18_Shale = 100 - F18_Sand - G18_Iron - D18_Limestome;
    E18_Shale = E17_Shale + I31_Al2O3 - I17_Al2O3;

    setE18_Shale(E18_Shale.toFixed(1));
  };

  const compute_F16_Sand = () => {
    F15 = isNaN(parseFloat(F15)) ? 0.0 : parseFloat(F15);
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    H15_SiO2 = isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2);
    // F31_SM_TG = isNaN(parseFloat(F31_SM_TG)) ? 0.0 : parseFloat(F31_SM_TG);
    // U15_SM = isNaN(parseFloat(U15_SM)) ? 0.0 : parseFloat(U15_SM);
    // C31_SM_PR = isNaN(parseFloat(C31_SM_PR)) ? 0.0 : parseFloat(C31_SM_PR);

    // F16_Sand = F15 + (F31_SM_TG - U15_SM) * C31_SM_PR * 1.3;
    F16_Sand = F15 + H31_SiO2 + H15_SiO2;

    setF16_Sand(F16_Sand.toFixed(1));
  };

  const compute_F17_Sand = () => {
    F16_Sand = isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand);
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    H16_SiO2 = isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2);
    // F31_SM_TG = isNaN(parseFloat(F31_SM_TG)) ? 0.0 : parseFloat(F31_SM_TG);
    // U16_SM = isNaN(parseFloat(U16_SM)) ? 0.0 : parseFloat(U16_SM);
    // C31_SM_PR = isNaN(parseFloat(C31_SM_PR)) ? 0.0 : parseFloat(C31_SM_PR);

    // F17_Sand = F16_Sand + (F31_SM_TG - U16_SM) * C31_SM_PR * 1.3;
    F17_Sand = F16_Sand + H31_SiO2 + H16_SiO2;

    setF17_Sand(F17_Sand.toFixed(1));
  };

  const compute_F18_Sand = () => {
    F17_Sand = isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand);
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    H17_SiO2 = isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2);
    // F31_SM_TG = isNaN(parseFloat(F31_SM_TG)) ? 0.0 : parseFloat(F31_SM_TG);
    // U17_SM = isNaN(parseFloat(U17_SM)) ? 0.0 : parseFloat(U17_SM);
    // C31_SM_PR = isNaN(parseFloat(C31_SM_PR)) ? 0.0 : parseFloat(C31_SM_PR);

    // F18_Sand = F17_Sand + (F31_SM_TG - U17_SM) * C31_SM_PR * 1.3;
    F18_Sand = F17_Sand + H31_SiO2 + H17_SiO2;

    setF18_Sand(F18_Sand.toFixed(1));
  };
  const compute_G16_Iron = () => {
    G15 = isNaN(parseFloat(G15)) ? 0.0 : parseFloat(G15);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    // F32_AM_TG = isNaN(parseFloat(F32_AM_TG)) ? 0.0 : parseFloat(F32_AM_TG);
    // V15_AM = isNaN(parseFloat(V15_AM)) ? 0.0 : parseFloat(V15_AM);
    // C32_AM_PR = isNaN(parseFloat(C32_AM_PR)) ? 0.0 : parseFloat(C32_AM_PR);

    // G16_Iron = G15 + (F32_AM_TG - V15_AM) * C32_AM_PR * 1.3;
    G16_Iron = G15 + J31_Fe2O3 - J15_Fe2O3;

    setG16_Iron(G16_Iron.toFixed(1));
  };
  const compute_G17_Iron = () => {
    G16_Iron = isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    // F32_AM_TG = isNaN(parseFloat(F32_AM_TG)) ? 0.0 : parseFloat(F32_AM_TG);
    // V16_AM = isNaN(parseFloat(V16_AM)) ? 0.0 : parseFloat(V16_AM);
    // C32_AM_PR = isNaN(parseFloat(C32_AM_PR)) ? 0.0 : parseFloat(C32_AM_PR);

    // G17_Iron = G16_Iron + (F32_AM_TG - V16_AM) * C32_AM_PR * 1.3;
    G17_Iron = G16_Iron + J31_Fe2O3 - J16_Fe2O3;

    setG17_Iron(G17_Iron.toFixed(1));
  };
  const compute_G18_Iron = () => {
    G17_Iron = isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    // F32_AM_TG = isNaN(parseFloat(F32_AM_TG)) ? 0.0 : parseFloat(F32_AM_TG);
    // V17_AM = isNaN(parseFloat(V17_AM)) ? 0.0 : parseFloat(V17_AM);
    // C32_AM_PR = isNaN(parseFloat(C32_AM_PR)) ? 0.0 : parseFloat(C32_AM_PR);

    // G18_Iron = G17_Iron + (F32_AM_TG - V17_AM) * C32_AM_PR * 1.3;
    G18_Iron = G17_Iron + J31_Fe2O3 - J17_Fe2O3;

    setG18_Iron(G18_Iron.toFixed(1));
  };
  // *************************************
  //end Material Setting Elements

  //AVERAGE
  function calculateAverage_D20_AVG() {
    const range = [
      isNaN(parseFloat(D15)) ? 0.0 : parseFloat(D15),
      isNaN(parseFloat(D16_Limestome)) ? 0.0 : parseFloat(D16_Limestome),
      isNaN(parseFloat(D17_Limestome)) ? 0.0 : parseFloat(D17_Limestome),
      isNaN(parseFloat(D18_Limestome)) ? 0.0 : parseFloat(D18_Limestome),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    D20_AVG = sum / range.length;
    setD20_AVG(D20_AVG.toFixed(2));
  }
  function calculateAverage_E20_AVG() {
    const range = [
      isNaN(parseFloat(E15)) ? 0.0 : parseFloat(E15),
      isNaN(parseFloat(E16_Shale)) ? 0.0 : parseFloat(E16_Shale),
      isNaN(parseFloat(E17_Shale)) ? 0.0 : parseFloat(E17_Shale),
      isNaN(parseFloat(E18_Shale)) ? 0.0 : parseFloat(E18_Shale),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    E20_AVG = sum / range.length;
    setE20_AVG(E20_AVG.toFixed(2));
  }
  function calculateAverage_F20_AVG() {
    const range = [
      isNaN(parseFloat(F15)) ? 0.0 : parseFloat(F15),
      isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand),
      isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand),
      isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    F20_AVG = sum / range.length;
    setF20_AVG(F20_AVG.toFixed(2));
  }
  function calculateAverage_G20_AVG() {
    const range = [
      isNaN(parseFloat(G15)) ? 0.0 : parseFloat(G15),
      isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron),
      isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron),
      isNaN(parseFloat(G18_Iron)) ? 0.0 : parseFloat(G18_Iron),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    G20_AVG = sum / range.length;
    setG20_AVG(G20_AVG.toFixed(2));
  }
  function calculateAverage_H20_AVG() {
    const range = [
      isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2),
      isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2),
      isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2),
      isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    H20_AVG = sum / range.length;
    setH20_AVG(H20_AVG.toFixed(2));
  }
  function calculateAverage_I20_AVG() {
    const range = [
      isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3),
      isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3),
      isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3),
      isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    I20_AVG = sum / range.length;
    setI20_AVG(I20_AVG.toFixed(2));
  }
  function calculateAverage_J20_AVG() {
    const range = [
      isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3),
      isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3),
      isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3),
      isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    J20_AVG = sum / range.length;
    setJ20_AVG(J20_AVG.toFixed(2));
  }
  function calculateAverage_K20_AVG() {
    const range = [
      isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO),
      isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO),
      isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO),
      isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    K20_AVG = sum / range.length;
    setK20_AVG(K20_AVG.toFixed(2));
  }
  function calculateAverage_L20_AVG() {
    const range = [
      isNaN(parseFloat(L15_MgO)) ? 0.0 : parseFloat(L15_MgO),
      isNaN(parseFloat(L16_MgO)) ? 0.0 : parseFloat(L16_MgO),
      isNaN(parseFloat(L17_MgO)) ? 0.0 : parseFloat(L17_MgO),
      isNaN(parseFloat(L18_MgO)) ? 0.0 : parseFloat(L18_MgO),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    L20_AVG = sum / range.length;
    setL20_AVG(L20_AVG.toFixed(2));
  }
  function calculateAverage_M20_AVG() {
    const range = [
      isNaN(parseFloat(M15_Na2O)) ? 0.0 : parseFloat(M15_Na2O),
      isNaN(parseFloat(M16_Na2O)) ? 0.0 : parseFloat(M16_Na2O),
      isNaN(parseFloat(M17_Na2O)) ? 0.0 : parseFloat(M17_Na2O),
      isNaN(parseFloat(M18_Na2O)) ? 0.0 : parseFloat(M18_Na2O),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    M20_AVG = sum / range.length;
    setM20_AVG(M20_AVG.toFixed(2));
  }
  function calculateAverage_N20_AVG() {
    const range = [
      isNaN(parseFloat(N15_K2O)) ? 0.0 : parseFloat(N15_K2O),
      isNaN(parseFloat(N16_K2O)) ? 0.0 : parseFloat(N16_K2O),
      isNaN(parseFloat(N17_K2O)) ? 0.0 : parseFloat(N17_K2O),
      isNaN(parseFloat(N18_K2O)) ? 0.0 : parseFloat(N18_K2O),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    N20_AVG = sum / range.length;
    setN20_AVG(N20_AVG.toFixed(2));
  }
  function calculateAverage_O20_AVG() {
    const range = [
      isNaN(parseFloat(O15_SO3)) ? 0.0 : parseFloat(O15_SO3),
      isNaN(parseFloat(O16_SO3)) ? 0.0 : parseFloat(O16_SO3),
      isNaN(parseFloat(O17_SO3)) ? 0.0 : parseFloat(O17_SO3),
      isNaN(parseFloat(O18_SO3)) ? 0.0 : parseFloat(O18_SO3),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    O20_AVG = sum / range.length;
    setO20_AVG(O20_AVG.toFixed(2));
  }
  function calculateAverage_P20_AVG() {
    const range = [
      isNaN(parseFloat(P15_Cl)) ? 0.0 : parseFloat(P15_Cl),
      isNaN(parseFloat(P16_Cl)) ? 0.0 : parseFloat(P16_Cl),
      isNaN(parseFloat(P17_Cl)) ? 0.0 : parseFloat(P17_Cl),
      isNaN(parseFloat(P18_Cl)) ? 0.0 : parseFloat(P18_Cl),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    P20_AVG = sum / range.length;
    setP20_AVG(P20_AVG.toFixed(2));
  }
  function calculateAverage_Q20_AVG() {
    const range = [
      isNaN(parseFloat(Q15_LOI)) ? 0.0 : parseFloat(Q15_LOI),
      isNaN(parseFloat(Q16_LOI)) ? 0.0 : parseFloat(Q16_LOI),
      isNaN(parseFloat(Q17_LOI)) ? 0.0 : parseFloat(Q17_LOI),
      isNaN(parseFloat(Q18_LOI)) ? 0.0 : parseFloat(Q18_LOI),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    Q20_AVG = sum / range.length;
    setQ20_AVG(Q20_AVG.toFixed(2));
  }
  function calculateAverage_R20_AVG() {
    const range = [
      isNaN(parseFloat(R15_XRFtotal)) ? 0.0 : parseFloat(R15_XRFtotal),
      isNaN(parseFloat(R16_XRFtotal)) ? 0.0 : parseFloat(R16_XRFtotal),
      isNaN(parseFloat(R17_XRFtotal)) ? 0.0 : parseFloat(R17_XRFtotal),
      isNaN(parseFloat(R18_XRFtotal)) ? 0.0 : parseFloat(R18_XRFtotal),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    R20_AVG = sum / range.length;
    setR20_AVG(R20_AVG.toFixed(2));
  }
  function calculateAverage_S20_AVG() {
    const range = [
      isNaN(parseFloat(S15_LSF)) ? 0.0 : parseFloat(S15_LSF),
      isNaN(parseFloat(S16_LSF)) ? 0.0 : parseFloat(S16_LSF),
      isNaN(parseFloat(S17_LSF)) ? 0.0 : parseFloat(S17_LSF),
      isNaN(parseFloat(S18_LSF)) ? 0.0 : parseFloat(S18_LSF),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    S20_AVG = sum / range.length;
    setS20_AVG(S20_AVG.toFixed(2));
  }
  function calculateAverage_T20_AVG() {
    const range = [
      isNaN(parseFloat(T15_HM)) ? 0.0 : parseFloat(T15_HM),
      isNaN(parseFloat(T16_HM)) ? 0.0 : parseFloat(T16_HM),
      isNaN(parseFloat(T17_HM)) ? 0.0 : parseFloat(T17_HM),
      isNaN(parseFloat(T18_HM)) ? 0.0 : parseFloat(T18_HM),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    T20_AVG = sum / range.length;
    setT20_AVG(T20_AVG.toFixed(2));
  }
  function calculateAverage_U20_AVG() {
    const range = [
      isNaN(parseFloat(U15_SM)) ? 0.0 : parseFloat(U15_SM),
      isNaN(parseFloat(U16_SM)) ? 0.0 : parseFloat(U16_SM),
      isNaN(parseFloat(U17_SM)) ? 0.0 : parseFloat(U17_SM),
      isNaN(parseFloat(U18_SM)) ? 0.0 : parseFloat(U18_SM),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    U20_AVG = sum / range.length;
    setU20_AVG(U20_AVG.toFixed(2));
  }
  function calculateAverage_V20_AVG() {
    const range = [
      isNaN(parseFloat(V15_AM)) ? 0.0 : parseFloat(V15_AM),
      isNaN(parseFloat(V16_AM)) ? 0.0 : parseFloat(V16_AM),
      isNaN(parseFloat(V17_AM)) ? 0.0 : parseFloat(V17_AM),
      isNaN(parseFloat(V18_AM)) ? 0.0 : parseFloat(V18_AM),
    ];
    const sum = range.reduce((total, value) => total + value, 0);
    V20_AVG = sum / range.length;
    setV20_AVG(V20_AVG.toFixed(2));
  }
  //end Average

  //STDEV
  function calculateSTDev_D20_STDEV() {
    const range = [
      isNaN(parseFloat(D15)) ? 0.0 : parseFloat(D15),
      isNaN(parseFloat(D16_Limestome)) ? 0.0 : parseFloat(D16_Limestome),
      isNaN(parseFloat(D17_Limestome)) ? 0.0 : parseFloat(D17_Limestome),
      isNaN(parseFloat(D18_Limestome)) ? 0.0 : parseFloat(D18_Limestome),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    D20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setD20_STDEV(D20_STDEV.toFixed(2));
  }
  function calculateSTDev_E20_STDEV() {
    const range = [
      isNaN(parseFloat(E15)) ? 0.0 : parseFloat(E15),
      isNaN(parseFloat(E16_Shale)) ? 0.0 : parseFloat(E16_Shale),
      isNaN(parseFloat(E17_Shale)) ? 0.0 : parseFloat(E17_Shale),
      isNaN(parseFloat(E18_Shale)) ? 0.0 : parseFloat(E18_Shale),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    E20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setE20_STDEV(E20_STDEV.toFixed(2));
  }
  function calculateSTDev_F20_STDEV() {
    const range = [
      isNaN(parseFloat(F15)) ? 0.0 : parseFloat(F15),
      isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand),
      isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand),
      isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    F20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setF20_STDEV(F20_STDEV.toFixed(2));
  }
  function calculateSTDev_G20_STDEV() {
    const range = [
      isNaN(parseFloat(G15)) ? 0.0 : parseFloat(G15),
      isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron),
      isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron),
      isNaN(parseFloat(G18_Iron)) ? 0.0 : parseFloat(G18_Iron),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    G20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setG20_STDEV(G20_STDEV.toFixed(2));
  }

  function calculateSTDev_H20_STDEV() {
    const range = [
      isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2),
      isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2),
      isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2),
      isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    H20_STDEV = Math.sqrt(variance);

    setH20_STDEV(H20_STDEV.toFixed(2));
  }

  function calculateSTDev_I20_STDEV() {
    const range = [
      isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3),
      isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3),
      isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3),
      isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    I20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setI20_STDEV(I20_STDEV.toFixed(2));
  }
  function calculateSTDev_J20_STDEV() {
    const range = [
      isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3),
      isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3),
      isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3),
      isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    J20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setJ20_STDEV(J20_STDEV.toFixed(2));
  }
  function calculateSTDev_K20_STDEV() {
    const range = [
      isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO),
      isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO),
      isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO),
      isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    K20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setK20_STDEV(K20_STDEV.toFixed(2));
  }
  function calculateSTDev_L20_STDEV() {
    const range = [
      isNaN(parseFloat(L15_MgO)) ? 0.0 : parseFloat(L15_MgO),
      isNaN(parseFloat(L16_MgO)) ? 0.0 : parseFloat(L16_MgO),
      isNaN(parseFloat(L17_MgO)) ? 0.0 : parseFloat(L17_MgO),
      isNaN(parseFloat(L18_MgO)) ? 0.0 : parseFloat(L18_MgO),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    L20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setL20_STDEV(L20_STDEV.toFixed(2));
  }
  function calculateSTDev_M20_STDEV() {
    const range = [
      isNaN(parseFloat(M15_Na2O)) ? 0.0 : parseFloat(M15_Na2O),
      isNaN(parseFloat(M16_Na2O)) ? 0.0 : parseFloat(M16_Na2O),
      isNaN(parseFloat(M17_Na2O)) ? 0.0 : parseFloat(M17_Na2O),
      isNaN(parseFloat(M18_Na2O)) ? 0.0 : parseFloat(M18_Na2O),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    M20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setM20_STDEV(M20_STDEV.toFixed(2));
  }
  function calculateSTDev_N20_STDEV() {
    const range = [
      isNaN(parseFloat(N15_K2O)) ? 0.0 : parseFloat(N15_K2O),
      isNaN(parseFloat(N16_K2O)) ? 0.0 : parseFloat(N16_K2O),
      isNaN(parseFloat(N17_K2O)) ? 0.0 : parseFloat(N17_K2O),
      isNaN(parseFloat(N18_K2O)) ? 0.0 : parseFloat(N18_K2O),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    N20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setN20_STDEV(N20_STDEV.toFixed(2));
  }
  function calculateSTDev_O20_STDEV() {
    const range = [
      isNaN(parseFloat(O15_SO3)) ? 0.0 : parseFloat(O15_SO3),
      isNaN(parseFloat(O16_SO3)) ? 0.0 : parseFloat(O16_SO3),
      isNaN(parseFloat(O17_SO3)) ? 0.0 : parseFloat(O17_SO3),
      isNaN(parseFloat(O18_SO3)) ? 0.0 : parseFloat(O18_SO3),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    O20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setO20_STDEV(O20_STDEV.toFixed(2));
  }

  function calculateSTDev_P20_STDEV() {
    const range = [
      isNaN(parseFloat(P15_Cl)) ? 0.0 : parseFloat(P15_Cl),
      isNaN(parseFloat(P16_Cl)) ? 0.0 : parseFloat(P16_Cl),
      isNaN(parseFloat(P17_Cl)) ? 0.0 : parseFloat(P17_Cl),
      isNaN(parseFloat(P18_Cl)) ? 0.0 : parseFloat(P18_Cl),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    P20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setP20_STDEV(P20_STDEV.toFixed(2));
  }
  function calculateSTDev_Q20_STDEV() {
    const range = [
      isNaN(parseFloat(Q15_LOI)) ? 0.0 : parseFloat(Q15_LOI),
      isNaN(parseFloat(Q16_LOI)) ? 0.0 : parseFloat(Q16_LOI),
      isNaN(parseFloat(Q17_LOI)) ? 0.0 : parseFloat(Q17_LOI),
      isNaN(parseFloat(Q18_LOI)) ? 0.0 : parseFloat(Q18_LOI),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    Q20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setQ20_STDEV(Q20_STDEV.toFixed(2));
  }
  function calculateSTDev_R20_STDEV() {
    const range = [
      isNaN(parseFloat(R15_XRFtotal)) ? 0.0 : parseFloat(R15_XRFtotal),
      isNaN(parseFloat(R16_XRFtotal)) ? 0.0 : parseFloat(R16_XRFtotal),
      isNaN(parseFloat(R17_XRFtotal)) ? 0.0 : parseFloat(R17_XRFtotal),
      isNaN(parseFloat(R18_XRFtotal)) ? 0.0 : parseFloat(R18_XRFtotal),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    R20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setR20_STDEV(R20_STDEV.toFixed(2));
  }
  function calculateSTDev_S20_STDEV() {
    const range = [
      isNaN(parseFloat(S15_LSF)) ? 0.0 : parseFloat(S15_LSF),
      isNaN(parseFloat(S16_LSF)) ? 0.0 : parseFloat(S16_LSF),
      isNaN(parseFloat(S17_LSF)) ? 0.0 : parseFloat(S17_LSF),
      isNaN(parseFloat(S18_LSF)) ? 0.0 : parseFloat(S18_LSF),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    S20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setS20_STDEV(S20_STDEV.toFixed(2));
  }
  function calculateSTDev_T20_STDEV() {
    const range = [
      isNaN(parseFloat(T15_HM)) ? 0.0 : parseFloat(T15_HM),
      isNaN(parseFloat(T16_HM)) ? 0.0 : parseFloat(T16_HM),
      isNaN(parseFloat(T17_HM)) ? 0.0 : parseFloat(T17_HM),
      isNaN(parseFloat(T18_HM)) ? 0.0 : parseFloat(T18_HM),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    T20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setT20_STDEV(T20_STDEV.toFixed(2));
  }
  function calculateSTDev_U20_STDEV() {
    const range = [
      isNaN(parseFloat(U15_SM)) ? 0.0 : parseFloat(U15_SM),
      isNaN(parseFloat(U16_SM)) ? 0.0 : parseFloat(U16_SM),
      isNaN(parseFloat(U17_SM)) ? 0.0 : parseFloat(U17_SM),
      isNaN(parseFloat(U18_SM)) ? 0.0 : parseFloat(U18_SM),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    U20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setU20_STDEV(U20_STDEV.toFixed(2));
  }
  function calculateSTDev_V20_STDEV() {
    const range = [
      isNaN(parseFloat(V15_AM)) ? 0.0 : parseFloat(V15_AM),
      isNaN(parseFloat(V16_AM)) ? 0.0 : parseFloat(V16_AM),
      isNaN(parseFloat(V17_AM)) ? 0.0 : parseFloat(V17_AM),
      isNaN(parseFloat(V18_AM)) ? 0.0 : parseFloat(V18_AM),
    ];
    const mean =
      range.reduce((total, value) => total + value, 0) / range.length;
    const squaredDifferencesSum = range.reduce(
      (total, value) => total + Math.pow(value - mean, 2),
      0
    );
    const variance = squaredDifferencesSum / range.length;
    V20_STDEV = isNaN(Math.sqrt(variance)) ? 0.0 : Math.sqrt(variance);
    setV20_STDEV(V20_STDEV.toFixed(2));
  }
  //end STDEV

  //MIN
  function findMinValue_D20_MIN() {
    D20_MIN = Math.min(D15, D16_Limestome, D17_Limestome, D18_Limestome);
    setD20_MIN(D20_MIN.toFixed(2));
  }
  function findMinValue_E20_MIN() {
    E20_MIN = Math.min(E15, E16_Shale, E17_Shale, E18_Shale);
    setE20_MIN(E20_MIN.toFixed(2));
  }
  function findMinValue_F20_MIN() {
    F20_MIN = Math.min(F15, F16_Sand, F17_Sand, F18_Sand);
    setF20_MIN(F20_MIN.toFixed(2));
  }
  function findMinValue_G20_MIN() {
    G20_MIN = Math.min(G15, G16_Iron, G17_Iron, G18_Iron);
    setG20_MIN(G20_MIN.toFixed(2));
  }
  function findMinValue_H20_MIN() {
    H20_MIN = Math.min(H15_SiO2, H16_SiO2, H17_SiO2, H18_SiO2);
    setH20_MIN(H20_MIN.toFixed(2));
  }
  function findMinValue_I20_MIN() {
    I20_MIN = Math.min(I15_Al2O3, I16_Al2O3, I17_Al2O3, I18_Al2O3);
    setI20_MIN(I20_MIN.toFixed(2));
  }
  function findMinValue_J20_MIN() {
    J20_MIN = Math.min(J15_Fe2O3, J16_Fe2O3, J17_Fe2O3, J18_Fe2O3);
    setJ20_MIN(J20_MIN.toFixed(2));
  }
  function findMinValue_K20_MIN() {
    K20_MIN = Math.min(K15_CaO, K16_CaO, K17_CaO, K18_CaO);
    setK20_MIN(K20_MIN.toFixed(2));
  }
  function findMinValue_L20_MIN() {
    L20_MIN = Math.min(L15_MgO, L16_MgO, L17_MgO, L18_MgO);
    setL20_MIN(L20_MIN.toFixed(2));
  }
  function findMinValue_M20_MIN() {
    M20_MIN = Math.min(M15_Na2O, M16_Na2O, M17_Na2O, M18_Na2O);
    setM20_MIN(M20_MIN.toFixed(2));
  }
  function findMinValue_N20_MIN() {
    N20_MIN = Math.min(N15_K2O, N16_K2O, N17_K2O, N18_K2O);
    setN20_MIN(N20_MIN.toFixed(2));
  }
  function findMinValue_O20_MIN() {
    O20_MIN = Math.min(O15_SO3, O16_SO3, O17_SO3, O18_SO3);
    setO20_MIN(O20_MIN.toFixed(2));
  }
  function findMinValue_P20_MIN() {
    P20_MIN = Math.min(P15_Cl, P16_Cl, P17_Cl, P18_Cl);
    setP20_MIN(P20_MIN.toFixed(2));
  }
  function findMinValue_Q20_MIN() {
    Q20_MIN = Math.min(Q15_LOI, Q16_LOI, Q17_LOI, Q18_LOI);
    setQ20_MIN(Q20_MIN.toFixed(2));
  }
  function findMinValue_R20_MIN() {
    R20_MIN = Math.min(R15_XRFtotal, R16_XRFtotal, R17_XRFtotal, R18_XRFtotal);
    setR20_MIN(R20_MIN.toFixed(2));
  }
  function findMinValue_S20_MIN() {
    S20_MIN = Math.min(S15_LSF, S16_LSF, S17_LSF, S18_LSF);
    setS20_MIN(S20_MIN.toFixed(2));
  }
  function findMinValue_T20_MIN() {
    T20_MIN = Math.min(T15_HM, T16_HM, T17_HM, T18_HM);
    setT20_MIN(T20_MIN.toFixed(2));
  }
  function findMinValue_U20_MIN() {
    U20_MIN = Math.min(U15_SM, U16_SM, U17_SM, U18_SM);
    setU20_MIN(U20_MIN.toFixed(2));
  }
  function findMinValue_V20_MIN() {
    V20_MIN = Math.min(V15_AM, V16_AM, V17_AM, V18_AM);
    setV20_MIN(V20_MIN.toFixed(2));
  }
  //end MIN

  //MAX
  function findMaxValue_D20_MAX() {
    D20_MAX = Math.max(D15, D16_Limestome, D17_Limestome, D18_Limestome);
    setD20_MAX(D20_MAX.toFixed(2));
  }
  function findMaxValue_E20_MAX() {
    E20_MAX = Math.max(E15, E16_Shale, E17_Shale, E18_Shale);
    setE20_MAX(E20_MAX.toFixed(2));
  }
  function findMaxValue_F20_MAX() {
    F20_MAX = Math.max(F15, F16_Sand, F17_Sand, F18_Sand);
    setF20_MAX(F20_MAX.toFixed(2));
  }
  function findMaxValue_G20_MAX() {
    G20_MAX = Math.max(G15, G16_Iron, G17_Iron, G18_Iron);
    setG20_MAX(G20_MAX.toFixed(2));
  }
  function findMaxValue_H20_MAX() {
    H20_MAX = Math.max(H15_SiO2, H16_SiO2, H17_SiO2, H18_SiO2);
    setH20_MAX(H20_MAX.toFixed(2));
  }
  function findMaxValue_I20_MAX() {
    I20_MAX = Math.max(I15_Al2O3, I16_Al2O3, I17_Al2O3, I18_Al2O3);
    setI20_MAX(I20_MAX.toFixed(2));
  }
  function findMaxValue_J20_MAX() {
    J20_MAX = Math.max(J15_Fe2O3, J16_Fe2O3, J17_Fe2O3, J18_Fe2O3);
    setJ20_MAX(J20_MAX.toFixed(2));
  }
  function findMaxValue_K20_MAX() {
    K20_MAX = Math.max(K15_CaO, K16_CaO, K17_CaO, K18_CaO);
    setK20_MAX(K20_MAX.toFixed(2));
  }
  function findMaxValue_L20_MAX() {
    L20_MAX = Math.max(L15_MgO, L16_MgO, L17_MgO, L18_MgO);
    setL20_MAX(L20_MAX.toFixed(2));
  }
  function findMaxValue_M20_MAX() {
    M20_MAX = Math.max(M15_Na2O, M16_Na2O, M17_Na2O, M18_Na2O);
    setM20_MAX(M20_MAX.toFixed(2));
  }
  function findMaxValue_N20_MAX() {
    N20_MAX = Math.max(N15_K2O, N16_K2O, N17_K2O, N18_K2O);
    setN20_MAX(N20_MAX.toFixed(2));
  }
  function findMaxValue_O20_MAX() {
    O20_MAX = Math.max(O15_SO3, O16_SO3, O17_SO3, O18_SO3);
    setO20_MAX(O20_MAX.toFixed(2));
  }
  function findMaxValue_P20_MAX() {
    P20_MAX = Math.max(P15_Cl, P16_Cl, P17_Cl, P18_Cl);
    setP20_MAX(P20_MAX.toFixed(2));
  }
  function findMaxValue_Q20_MAX() {
    Q20_MAX = Math.max(Q15_LOI, Q16_LOI, Q17_LOI, Q18_LOI);
    setQ20_MAX(Q20_MAX.toFixed(2));
  }
  function findMaxValue_R20_MAX() {
    R20_MAX = Math.max(R15_XRFtotal, R16_XRFtotal, R17_XRFtotal, R18_XRFtotal);
    setR20_MAX(R20_MAX.toFixed(2));
  }
  function findMaxValue_S20_MAX() {
    S20_MAX = Math.max(S15_LSF, S16_LSF, S17_LSF, S18_LSF);
    setS20_MAX(S20_MAX.toFixed(2));
  }
  function findMaxValue_T20_MAX() {
    T20_MAX = Math.max(T15_HM, T16_HM, T17_HM, T18_HM);
    setT20_MAX(T20_MAX.toFixed(2));
  }
  function findMaxValue_U20_MAX() {
    U20_MAX = Math.max(U15_SM, U16_SM, U17_SM, U18_SM);
    setU20_MAX(U20_MAX.toFixed(2));
  }
  function findMaxValue_V20_MAX() {
    V20_MAX = Math.max(V15_AM, V16_AM, V17_AM, V18_AM);
    setV20_MAX(V20_MAX.toFixed(2));
  }

  //end MAX

  //START NAME: RAWMEAL and CLINKER TARGETS Functions
  const compute_Q31_LOI = () => {
    K31_CaO = isNaN(parseFloat(K31_CaO)) ? 0.0 : parseFloat(K31_CaO);
    L31_MgO = isNaN(parseFloat(L31_MgO)) ? 0.0 : parseFloat(L31_MgO);

    Q31_LOI = 0.786 * K31_CaO + 1.1 * L31_MgO + 0.2;

    setQ31_LOI(Q31_LOI.toFixed(2));
  };
  const compute_R31_total = () => {
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);
    K31_CaO = isNaN(parseFloat(K31_CaO)) ? 0.0 : parseFloat(K31_CaO);
    L31_MgO = isNaN(parseFloat(L31_MgO)) ? 0.0 : parseFloat(L31_MgO);
    M31_Na2O = isNaN(parseFloat(M31_Na2O)) ? 0.0 : parseFloat(M31_Na2O);
    N31_K2O = isNaN(parseFloat(N31_K2O)) ? 0.0 : parseFloat(N31_K2O);
    O31_SO3 = isNaN(parseFloat(O31_SO3)) ? 0.0 : parseFloat(O31_SO3);
    P31_Cl = isNaN(parseFloat(P31_Cl)) ? 0.0 : parseFloat(P31_Cl);
    Q31_LOI = isNaN(parseFloat(Q31_LOI)) ? 0.0 : parseFloat(Q31_LOI);

    R31_total =
      H31_SiO2 +
      I31_Al2O3 +
      J31_Fe2O3 +
      K31_CaO +
      L31_MgO +
      M31_Na2O +
      N31_K2O +
      O31_SO3 +
      P31_Cl +
      Q31_LOI;

    setR31_total(R31_total.toFixed(2));
  };

  const compute_S31_LSF = () => {
    K31_CaO = isNaN(parseFloat(K31_CaO)) ? 0.0 : parseFloat(K31_CaO);
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);

    S31_LSF =
      (K31_CaO * 100) / (2.8 * H31_SiO2 + 1.2 * I31_Al2O3 + 0.65 * J31_Fe2O3);

    setS31_LSF(S31_LSF.toFixed(2));
  };

  const compute_T31_HM = () => {
    K31_CaO = isNaN(parseFloat(K31_CaO)) ? 0.0 : parseFloat(K31_CaO);
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);

    T31_HM = K31_CaO / (H31_SiO2 + I31_Al2O3 + J31_Fe2O3);

    setT31_HM(T31_HM.toFixed(2));
  };

  const compute_U31_SM = () => {
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);

    U31_SM = H31_SiO2 / (I31_Al2O3 + J31_Fe2O3);

    setU31_SM(U31_SM.toFixed(2));
  };

  const compute_V31_AM = () => {
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);

    V31_AM = I31_Al2O3 / J31_Fe2O3;

    setV31_AM(V31_AM.toFixed(2));
  };

  //END NAME: RAWMEAL and CLINKER TARGETS Functions

  //Start NAME: Expected Clicker Composition Functions

  const compute_H35_SiO2 = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);

    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);

    H35_SiO2 = E33_Clinker_Factor * H31_SiO2;

    setH35_SiO2(H35_SiO2.toFixed(2));
  };
  const compute_I35_Al2O3 = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);

    I35_Al2O3 = E33_Clinker_Factor * I31_Al2O3;

    setI35_Al2O3(I35_Al2O3.toFixed(2));
  };
  const compute_J35_Fe2O3 = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);

    J35_Fe2O3 = E33_Clinker_Factor * J31_Fe2O3;

    setJ35_Fe2O3(J35_Fe2O3.toFixed(2));
  };
  const compute_K35_CaO = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    K31_CaO = isNaN(parseFloat(K31_CaO)) ? 0.0 : parseFloat(K31_CaO);

    K35_CaO = E33_Clinker_Factor * K31_CaO;

    setK35_CaO(K35_CaO.toFixed(2));
  };
  const compute_L35_MgO = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    L31_MgO = isNaN(parseFloat(L31_MgO)) ? 0.0 : parseFloat(L31_MgO);

    L35_MgO = E33_Clinker_Factor * L31_MgO;

    setL35_MgO(L35_MgO.toFixed(2));
  };
  const compute_M35_Na2O = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    M31_Na2O = isNaN(parseFloat(M31_Na2O)) ? 0.0 : parseFloat(M31_Na2O);

    M35_Na2O = E33_Clinker_Factor * M31_Na2O;

    setM35_Na2O(M35_Na2O.toFixed(2));
  };
  const compute_N35_K2O = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    N31_K2O = isNaN(parseFloat(N31_K2O)) ? 0.0 : parseFloat(N31_K2O);

    N35_K2O = E33_Clinker_Factor * N31_K2O;

    setN35_K2O(N35_K2O.toFixed(2));
  };
  const compute_O35_SO3 = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    O31_SO3 = isNaN(parseFloat(O31_SO3)) ? 0.0 : parseFloat(O31_SO3);

    O35_SO3 = E33_Clinker_Factor * O31_SO3;

    setO35_SO3(O35_SO3.toFixed(2));
  };
  const compute_P35_Cl = () => {
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    P31_Cl = isNaN(parseFloat(P31_Cl)) ? 0.0 : parseFloat(P31_Cl);

    P35_Cl = E33_Clinker_Factor * P31_Cl;

    setP35_Cl(P35_Cl.toFixed(2));
  };

  const compute_Q35_ECC_total = () => {
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);
    K35_CaO = isNaN(parseFloat(K35_CaO)) ? 0.0 : parseFloat(K35_CaO);
    L35_MgO = isNaN(parseFloat(L35_MgO)) ? 0.0 : parseFloat(L35_MgO);
    M35_Na2O = isNaN(parseFloat(M35_Na2O)) ? 0.0 : parseFloat(M35_Na2O);
    N35_K2O = isNaN(parseFloat(N35_K2O)) ? 0.0 : parseFloat(N35_K2O);
    O35_SO3 = isNaN(parseFloat(O35_SO3)) ? 0.0 : parseFloat(O35_SO3);
    P35_Cl = isNaN(parseFloat(P35_Cl)) ? 0.0 : parseFloat(P35_Cl);

    Q35_ECC_total =
      H35_SiO2 +
      I35_Al2O3 +
      J35_Fe2O3 +
      K35_CaO +
      L35_MgO +
      M35_Na2O +
      N35_K2O +
      O35_SO3 +
      P35_Cl;

    setQ35_ECC_total(Q35_ECC_total.toFixed(2));
  };
  const compute_S35_LSF = () => {
    K35_CaO = isNaN(parseFloat(K35_CaO)) ? 0.0 : parseFloat(K35_CaO);
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    S35_LSF =
      (K35_CaO * 100) / (2.8 * H35_SiO2 + 1.2 * I35_Al2O3 + 0.65 * J35_Fe2O3);

    setS35_LSF(S35_LSF.toFixed(2));
  };
  const compute_T35_HM = () => {
    K35_CaO = isNaN(parseFloat(K35_CaO)) ? 0.0 : parseFloat(K35_CaO);
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    T35_HM = K35_CaO / (H35_SiO2 + I35_Al2O3 + J35_Fe2O3);

    setT35_HM(T35_HM.toFixed(2));
  };
  const compute_U35_SM = () => {
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    U35_SM = H35_SiO2 / (I35_Al2O3 + J35_Fe2O3);

    setU35_SM(U35_SM.toFixed(2));
  };
  const compute_V35_AM = () => {
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    V35_AM = I35_Al2O3 / J35_Fe2O3;

    setV35_AM(V35_AM.toFixed(2));
  };

  //NEXT CELL TABLE

  const compute_K38_DOC = () => {
    L38_KL_LOI = isNaN(parseFloat(L38_KL_LOI)) ? 0.0 : parseFloat(L38_KL_LOI);
    V38_LOI = isNaN(parseFloat(V38_LOI)) ? 0.0 : parseFloat(V38_LOI);
    L38_KL_LOI = isNaN(parseFloat(L38_KL_LOI)) ? 0.0 : parseFloat(L38_KL_LOI);
    L38_KL_LOI = isNaN(parseFloat(L38_KL_LOI)) ? 0.0 : parseFloat(L38_KL_LOI);
    V38_LOI = isNaN(parseFloat(V38_LOI)) ? 0.0 : parseFloat(V38_LOI);

    K38_DOC =
      ((L38_KL_LOI / 100 - V38_LOI / 100) /
        (L38_KL_LOI / 100 - (L38_KL_LOI / 100) * (V38_LOI / 100))) *
      100;

    setK38_DOC(K38_DOC.toFixed(2));
  };
  const compute_M38_C3Snet = () => {
    K35_CaO = isNaN(parseFloat(K35_CaO)) ? 0.0 : parseFloat(K35_CaO);
    I38_FCaO = isNaN(parseFloat(I38_FCaO)) ? 0.0 : parseFloat(I38_FCaO);
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);
    O35_SO3 = isNaN(parseFloat(O35_SO3)) ? 0.0 : parseFloat(O35_SO3);

    M38_C3Snet =
      4.07 * (K35_CaO - I38_FCaO) -
      7.6 * H35_SiO2 -
      6.72 * I35_Al2O3 -
      1.43 * J35_Fe2O3 -
      2.85 * O35_SO3;

    setM38_C3Snet(M38_C3Snet.toFixed(2));
  };
  const compute_N38_C2S = () => {
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    M38_C3Snet = isNaN(parseFloat(M38_C3Snet)) ? 0.0 : parseFloat(M38_C3Snet);

    N38_C2S = 2.867 * H35_SiO2 - 0.7544 * M38_C3Snet;

    setN38_C2S(N38_C2S.toFixed(2));
  };
  const compute_O38_C3A = () => {
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    O38_C3A = 2.65 * I35_Al2O3 - 1.693 * J35_Fe2O3;

    setO38_C3A(O38_C3A.toFixed(2));
  };
  const compute_P38_C4AF = () => {
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    P38_C4AF = 3.04 * J35_Fe2O3;

    setP38_C4AF(P38_C4AF.toFixed(2));
  };
  const compute_Q38_Sulfur_Alkali_ratio = () => {
    R38_total_Alkali = isNaN(parseFloat(R38_total_Alkali))
      ? 0.0
      : parseFloat(R38_total_Alkali);
    O35_SO3 = isNaN(parseFloat(O35_SO3)) ? 0.0 : parseFloat(O35_SO3);

    Q38_Sulfur_Alkali_ratio = 1 / (R38_total_Alkali / 62 / (O35_SO3 / 80));

    setQ38_Sulfur_Alkali_ratio(Q38_Sulfur_Alkali_ratio.toFixed(2));
  };
  const compute_R38_total_Alkali = () => {
    M35_Na2O = isNaN(parseFloat(M35_Na2O)) ? 0.0 : parseFloat(M35_Na2O);
    N35_K2O = isNaN(parseFloat(N35_K2O)) ? 0.0 : parseFloat(N35_K2O);

    R38_total_Alkali = M35_Na2O + 0.658 * N35_K2O;

    setR38_total_Alkali(R38_total_Alkali.toFixed(2));
  };
  const compute_S38_Liquid_Phase = () => {
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);
    L35_MgO = isNaN(parseFloat(L35_MgO)) ? 0.0 : parseFloat(L35_MgO);
    M35_Na2O = isNaN(parseFloat(M35_Na2O)) ? 0.0 : parseFloat(M35_Na2O);
    N35_K2O = isNaN(parseFloat(N35_K2O)) ? 0.0 : parseFloat(N35_K2O);
    O35_SO3 = isNaN(parseFloat(O35_SO3)) ? 0.0 : parseFloat(O35_SO3);
    S38_Liquid_Phase =
      3 * I35_Al2O3 + 2.25 * J35_Fe2O3 + L35_MgO + M35_Na2O + N35_K2O + O35_SO3;

    setS38_Liquid_Phase(S38_Liquid_Phase.toFixed(2));
  };
  const compute_T38_Coating_Index = () => {
    O38_C3A = isNaN(parseFloat(O38_C3A)) ? 0.0 : parseFloat(O38_C3A);
    P38_C4AF = isNaN(parseFloat(P38_C4AF)) ? 0.0 : parseFloat(P38_C4AF);
    N38_C2S = isNaN(parseFloat(N38_C2S)) ? 0.0 : parseFloat(N38_C2S);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);

    T38_Coating_Index = O38_C3A + P38_C4AF + N38_C2S * 0.2 + 2 * J35_Fe2O3;

    setT38_Coating_Index(T38_Coating_Index.toFixed(2));
  };

  //End NAME: Expected Clicker Composition Functions

  // MATERIAL ANALYSIS USEStates
  //SQLITE CREATE TABLE

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS rmTable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NULL,D15 NUMERIC,E15 NUMERIC,F15 NUMERIC,G15 NUMERIC,H15_SiO2 NUMERIC,I15_Al2O3 NUMERIC,J15_Fe2O3 NUMERIC,K15_CaO NUMERIC,L15_MgO NUMERIC,M15_Na2O NUMERIC,N15_K2O NUMERIC,O15_SO3 NUMERIC,P15_Cl NUMERIC,H16_SiO2 NUMERIC,I16_Al2O3 NUMERIC,J16_Fe2O3 NUMERIC,K16_CaO NUMERIC,L16_MgO NUMERIC,M16_Na2O NUMERIC,N16_K2O NUMERIC,O16_SO3 NUMERIC,P16_Cl NUMERIC,H17_SiO2 NUMERIC,I17_Al2O3 NUMERIC,J17_Fe2O3 NUMERIC,K17_CaO NUMERIC,L17_MgO NUMERIC,M17_Na2O NUMERIC,N17_K2O NUMERIC,O17_SO3 NUMERIC,P17_Cl NUMERIC,H18_SiO2 NUMERIC,I18_Al2O3 NUMERIC,J18_Fe2O3 NUMERIC,K18_CaO NUMERIC,L18_MgO NUMERIC,M18_Na2O NUMERIC,N18_K2O NUMERIC,O18_SO3 NUMERIC,P18_Cl NUMERIC,C30_LSF_PR NUMERIC,C31_SM_PR NUMERIC,C32_AM_PR NUMERIC,E33_Clinker_Factor NUMERIC,E34_RawMixType TEXT NULL,F30_LSF_TG NUMERIC,F31_SM_TG NUMERIC,F32_AM_TG NUMERIC,H31_SiO2 NUMERIC,I31_Al2O3 NUMERIC,J31_Fe2O3 NUMERIC,K31_CaO NUMERIC,L31_MgO NUMERIC,M31_Na2O NUMERIC,N31_K2O NUMERIC,O31_SO3 NUMERIC,P31_Cl NUMERIC,L38_KL_LOI NUMERIC,V38_LOI NUMERIC, DT DATETIME)"
      );
    });
    console.log("Table Created");
    clearall();
    // db.transaction(tx => {
    //   tx.executeSql('SELECT * FROM rmTable', null,
    //     (txObj, resultSet) => setNames(resultSet.rows._array),
    //     (txObj, error) => console.log(error)
    //   );
    // });

    setIsLoading(false);
  }, [db]);

  const addData = () => {
    const date = new Date();

    const formattedDate = date.toLocaleString();
    const formattedDate2 = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    setIsLoading(true);
    console.log("Trying to insert data...");

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO rmTable (name,D15,E15,F15,G15,H15_SiO2,I15_Al2O3,J15_Fe2O3,K15_CaO,L15_MgO,M15_Na2O,N15_K2O,O15_SO3,P15_Cl,H16_SiO2,I16_Al2O3,J16_Fe2O3,K16_CaO,L16_MgO,M16_Na2O,N16_K2O,O16_SO3,P16_Cl,H17_SiO2,I17_Al2O3,J17_Fe2O3,K17_CaO,L17_MgO,M17_Na2O,N17_K2O,O17_SO3,P17_Cl,H18_SiO2,I18_Al2O3,J18_Fe2O3,K18_CaO,L18_MgO,M18_Na2O,N18_K2O,O18_SO3,P18_Cl,C30_LSF_PR,C31_SM_PR,C32_AM_PR,E33_Clinker_Factor,E34_RawMixType,F30_LSF_TG,F31_SM_TG,F32_AM_TG,H31_SiO2,I31_Al2O3,J31_Fe2O3,K31_CaO,L31_MgO,M31_Na2O,N31_K2O,O31_SO3,P31_Cl,L38_KL_LOI,V38_LOI, DT) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          "RAWMILL_" + formattedDate,
          D15,
          E15,
          F15,
          G15,
          H15_SiO2,
          I15_Al2O3,
          J15_Fe2O3,
          K15_CaO,
          L15_MgO,
          M15_Na2O,
          N15_K2O,
          O15_SO3,
          P15_Cl,
          H16_SiO2,
          I16_Al2O3,
          J16_Fe2O3,
          K16_CaO,
          L16_MgO,
          M16_Na2O,
          N16_K2O,
          O16_SO3,
          P16_Cl,
          H17_SiO2,
          I17_Al2O3,
          J17_Fe2O3,
          K17_CaO,
          L17_MgO,
          M17_Na2O,
          N17_K2O,
          O17_SO3,
          P17_Cl,
          H18_SiO2,
          I18_Al2O3,
          J18_Fe2O3,
          K18_CaO,
          L18_MgO,
          M18_Na2O,
          N18_K2O,
          O18_SO3,
          P18_Cl,
          C30_LSF_PR,
          C31_SM_PR,
          C32_AM_PR,
          E33_Clinker_Factor,
          E34_RawMixType,
          F30_LSF_TG,
          F31_SM_TG,
          F32_AM_TG,
          H31_SiO2,
          I31_Al2O3,
          J31_Fe2O3,
          K31_CaO,
          L31_MgO,
          M31_Na2O,
          N31_K2O,
          O31_SO3,
          P31_Cl,
          L38_KL_LOI,
          V38_LOI,
          formattedDate2,
        ],
        (_, { rowsAffected }) => {
          console.log("Rows affected:", rowsAffected);
          alert("Save Complete!");
          setIsLoading(false);
        },
        (_, error) => {
          alert("Save Error: ", error);
        }
      );
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };

  const updateData = (id) => {
    console.log("Updating data...");
    setIsLoading(true);
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE rmTable SET D15 = ? ,E15       = ? ,F15       = ? ,G15       = ? ,H15_SiO2  = ? ,I15_Al2O3 = ? ,J15_Fe2O3 = ? ,K15_CaO   = ?,L15_MgO   = ? ,M15_Na2O  = ? ,N15_K2O   = ? ,O15_SO3   = ? ,P15_Cl    = ? ,H16_SiO2  = ? ,I16_Al2O3 = ? ,J16_Fe2O3 = ? ,K16_CaO   = ? ,L16_MgO   = ? ,M16_Na2O  = ? ,N16_K2O   = ? ,O16_SO3   = ? ,P16_Cl    = ? ,H17_SiO2  = ? ,I17_Al2O3 = ? ,J17_Fe2O3 = ? ,K17_CaO   = ? ,L17_MgO   = ? ,M17_Na2O  = ? ,N17_K2O   = ? ,O17_SO3   = ? ,P17_Cl    = ? ,H18_SiO2  = ? ,I18_Al2O3 = ? ,J18_Fe2O3 = ? ,K18_CaO   = ? ,L18_MgO   = ? ,M18_Na2O  = ? ,N18_K2O   = ? ,O18_SO3   = ? ,P18_Cl    = ? ,C30_LSF_PR= ? ,C31_SM_PR = ? ,C32_AM_PR = ? ,E33_Clinker_Factor= ? ,E34_RawMixType    = ? ,F30_LSF_TG        = ? ,F31_SM_TG         = ? ,F32_AM_TG         = ? ,H31_SiO2          = ? ,I31_Al2O3         = ? ,J31_Fe2O3         = ? ,K31_CaO           = ? ,L31_MgO           = ? ,M31_Na2O          = ? ,N31_K2O           = ? ,O31_SO3           = ? ,P31_Cl            = ? ,L38_KL_LOI        = ? ,V38_LOI           = ?  WHERE id = ?",
        [
          D15,
          E15,
          F15,
          G15,
          H15_SiO2,
          I15_Al2O3,
          J15_Fe2O3,
          K15_CaO,
          L15_MgO,
          M15_Na2O,
          N15_K2O,
          O15_SO3,
          P15_Cl,
          H16_SiO2,
          I16_Al2O3,
          J16_Fe2O3,
          K16_CaO,
          L16_MgO,
          M16_Na2O,
          N16_K2O,
          O16_SO3,
          P16_Cl,
          H17_SiO2,
          I17_Al2O3,
          J17_Fe2O3,
          K17_CaO,
          L17_MgO,
          M17_Na2O,
          N17_K2O,
          O17_SO3,
          P17_Cl,
          H18_SiO2,
          I18_Al2O3,
          J18_Fe2O3,
          K18_CaO,
          L18_MgO,
          M18_Na2O,
          N18_K2O,
          O18_SO3,
          P18_Cl,
          C30_LSF_PR,
          C31_SM_PR,
          C32_AM_PR,
          E33_Clinker_Factor,
          E34_RawMixType,
          F30_LSF_TG,
          F31_SM_TG,
          F32_AM_TG,
          H31_SiO2,
          I31_Al2O3,
          J31_Fe2O3,
          K31_CaO,
          L31_MgO,
          M31_Na2O,
          N31_K2O,
          O31_SO3,
          P31_Cl,
          L38_KL_LOI,
          V38_LOI,
          id,
        ],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            alert("Update Complete!");
            setIsLoading(false);
          }
        },
        (txObj, error) => alert("Update Error: " + error)
      );
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };

  //END SQLITE

  //SQL Table saved list
  const [dataList, setDataList] = useState([]);
  const SavedDataList = () => {
    useEffect(() => {
      loadData();
    }, []);

    const loadData = () => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM rmTable ", [], (_, { rows }) => {
          const items = rows._array;
          console.log("Row list: " + rows);
          setDataList(items);
        });
      });
    };
  };

  const deleteData = (id) => {
    setIsLoading(true);
    // alert("Loading selected data...");
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM rmTable WHERE id = ?", [id], (_, { rows }) => {
        const items = rows._array;
        setDataList(items);
        alert("ID: " + id + " Data Deleted!");
        setIsLoading(false);
      });
    });
    console.log("Deletion complete!");
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };

  const loadselectData = (id) => {
    setIsLoading(true);
    // alert("Loading selected data...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM rmTable WHERE id = ?",
        [id],
        (_, { rows }) => {
          const items = rows._array;
          setDataList(items);
          alert("Data Loaded!");
          setIsLoading(false);
        },
        loadall()
      );
    });
    console.log("Done loading data!");
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };

  //end SQL Table saved list

  //end Floating Button

  function selecteddata() {
    dataList.map(
      (item) => (
        setD15(item.D15.toFixed(2)),
        setE15(item.E15.toFixed(2)),
        setF15(item.F15.toFixed(2)),
        setG15(item.G15.toFixed(2)),
        setH15_SiO2(item.H15_SiO2.toFixed(2)),
        setI15_Al2O3(item.I15_Al2O3.toFixed(2)),
        setJ15_Fe2O3(item.J15_Fe2O3.toFixed(2)),
        setK15_CaO(item.K15_CaO.toFixed(2)),
        setL15_MgO(item.L15_MgO.toFixed(2)),
        setM15_Na2O(item.M15_Na2O.toFixed(2)),
        setN15_K2O(item.N15_K2O.toFixed(2)),
        setO15_SO3(item.O15_SO3.toFixed(2)),
        setP15_Cl(item.P15_Cl.toFixed(2)),
        setH16_SiO2(item.H16_SiO2.toFixed(2)),
        setI16_Al2O3(item.I16_Al2O3.toFixed(2)),
        setJ16_Fe2O3(item.J16_Fe2O3.toFixed(2)),
        setK16_CaO(item.K16_CaO.toFixed(2)),
        setL16_MgO(item.L16_MgO.toFixed(2)),
        setM16_Na2O(item.M16_Na2O.toFixed(2)),
        setN16_K2O(item.N16_K2O.toFixed(2)),
        setO16_SO3(item.O16_SO3.toFixed(2)),
        setP16_Cl(item.P16_Cl.toFixed(2)),
        setH17_SiO2(item.H17_SiO2.toFixed(2)),
        setI17_Al2O3(item.I17_Al2O3.toFixed(2)),
        setJ17_Fe2O3(item.J17_Fe2O3.toFixed(2)),
        setK17_CaO(item.K17_CaO.toFixed(2)),
        setL17_MgO(item.L17_MgO.toFixed(2)),
        setM17_Na2O(item.M17_Na2O.toFixed(2)),
        setN17_K2O(item.N17_K2O.toFixed(2)),
        setO17_SO3(item.O17_SO3.toFixed(2)),
        setP17_Cl(item.P17_Cl.toFixed(2)),
        setH18_SiO2(item.H18_SiO2.toFixed(2)),
        setI18_Al2O3(item.I18_Al2O3.toFixed(2)),
        setJ18_Fe2O3(item.J18_Fe2O3.toFixed(2)),
        setK18_CaO(item.K18_CaO.toFixed(2)),
        setL18_MgO(item.L18_MgO.toFixed(2)),
        setM18_Na2O(item.M18_Na2O.toFixed(2)),
        setN18_K2O(item.N18_K2O.toFixed(2)),
        setO18_SO3(item.O18_SO3.toFixed(2)),
        setP18_Cl(item.P18_Cl.toFixed(2)),
        setC30_LSF_PR(item.C30_LSF_PR.toFixed(2)),
        setC31_SM_PR(item.C31_SM_PR.toFixed(2)),
        setC32_AM_PR(item.C32_AM_PR.toFixed(2)),
        setE33_Clinker_Factor(item.E33_Clinker_Factor.toFixed(2)),
        setE34_RawMixType(item.E34_RawMixType.toString()),
        setF30_LSF_TG(item.F30_LSF_TG.toFixed(2)),
        setF31_SM_TG(item.F31_SM_TG.toFixed(2)),
        setF32_AM_TG(item.F32_AM_TG.toFixed(2)),
        setH31_SiO2(item.H31_SiO2.toFixed(2)),
        setI31_Al2O3(item.I31_Al2O3.toFixed(2)),
        setJ31_Fe2O3(item.J31_Fe2O3.toFixed(2)),
        setK31_CaO(item.K31_CaO.toFixed(2)),
        setL31_MgO(item.L31_MgO.toFixed(2)),
        setM31_Na2O(item.M31_Na2O.toFixed(2)),
        setN31_K2O(item.N31_K2O.toFixed(2)),
        setO31_SO3(item.O31_SO3.toFixed(2)),
        setP31_Cl(item.P31_Cl.toFixed(2)),
        setL38_KL_LOI(item.L38_KL_LOI.toFixed(2)),
        setV38_LOI(item.V38_LOI.toFixed(2)),
        loadall()
      )
    );

    loadall();
  }

  function loadall() {
    compute_S15_LSF_ratio();
    compute_T15_HM_ratio();
    compute_U15_SM_ratio();
    compute_V15_AM_ratio();
    compute_Q15_LOI();
    compute_R15_XRFtotal();

    compute_S16_LSF_ratio();
    compute_T16_HM_ratio();
    compute_U16_SM_ratio();
    compute_V16_AM_ratio();
    compute_Q16_LOI();
    compute_R16_XRFtotal();

    compute_S17_LSF_ratio();
    compute_T17_HM_ratio();
    compute_U17_SM_ratio();
    compute_V17_AM_ratio();
    compute_Q17_LOI();
    compute_R17_XRFtotal();

    compute_S18_LSF_ratio();
    compute_T18_HM_ratio();
    compute_U18_SM_ratio();
    compute_V18_AM_ratio();
    compute_Q18_LOI();
    compute_R18_XRFtotal();

    compute_total_C15();

    calculateAverage_D20_AVG();
    calculateAverage_E20_AVG();
    calculateAverage_F20_AVG();
    calculateAverage_G20_AVG();
    calculateAverage_H20_AVG();
    calculateAverage_I20_AVG();
    calculateAverage_J20_AVG();
    calculateAverage_K20_AVG();
    calculateAverage_L20_AVG();
    calculateAverage_M20_AVG();
    calculateAverage_N20_AVG();
    calculateAverage_O20_AVG();
    calculateAverage_P20_AVG();
    calculateAverage_Q20_AVG();
    calculateAverage_R20_AVG();
    calculateAverage_S20_AVG();
    calculateAverage_T20_AVG();
    calculateAverage_U20_AVG();
    calculateAverage_V20_AVG();

    calculateSTDev_D20_STDEV();
    calculateSTDev_E20_STDEV();
    calculateSTDev_F20_STDEV();
    calculateSTDev_G20_STDEV();
    calculateSTDev_H20_STDEV();
    calculateSTDev_I20_STDEV();
    calculateSTDev_J20_STDEV();
    calculateSTDev_K20_STDEV();
    calculateSTDev_L20_STDEV();
    calculateSTDev_M20_STDEV();
    calculateSTDev_N20_STDEV();
    calculateSTDev_O20_STDEV();
    calculateSTDev_P20_STDEV();
    calculateSTDev_Q20_STDEV();
    calculateSTDev_R20_STDEV();
    calculateSTDev_S20_STDEV();
    calculateSTDev_T20_STDEV();
    calculateSTDev_U20_STDEV();
    calculateSTDev_V20_STDEV();

    findMinValue_D20_MIN();
    findMinValue_E20_MIN();
    findMinValue_F20_MIN();
    findMinValue_G20_MIN();
    findMinValue_H20_MIN();
    findMinValue_I20_MIN();
    findMinValue_J20_MIN();
    findMinValue_K20_MIN();
    findMinValue_L20_MIN();
    findMinValue_M20_MIN();
    findMinValue_N20_MIN();
    findMinValue_O20_MIN();
    findMinValue_P20_MIN();
    findMinValue_Q20_MIN();
    findMinValue_R20_MIN();
    findMinValue_S20_MIN();
    findMinValue_T20_MIN();
    findMinValue_U20_MIN();
    findMinValue_V20_MIN();

    findMaxValue_D20_MAX();
    findMaxValue_E20_MAX();
    findMaxValue_F20_MAX();
    findMaxValue_G20_MAX();
    findMaxValue_H20_MAX();
    findMaxValue_I20_MAX();
    findMaxValue_J20_MAX();
    findMaxValue_K20_MAX();
    findMaxValue_L20_MAX();
    findMaxValue_M20_MAX();
    findMaxValue_N20_MAX();
    findMaxValue_O20_MAX();
    findMaxValue_P20_MAX();
    findMaxValue_Q20_MAX();
    findMaxValue_R20_MAX();
    findMaxValue_S20_MAX();
    findMaxValue_T20_MAX();
    findMaxValue_U20_MAX();
    findMaxValue_V20_MAX();

    compute_D16_Limestome();
    compute_F16_Sand();
    compute_G16_Iron();
    compute_E16_Shale();
    compute_D17_Limestome();
    compute_F17_Sand();
    compute_G17_Iron();
    compute_E17_Shale();
    compute_D18_Limestome();
    compute_F18_Sand();
    compute_G18_Iron();
    compute_E18_Shale();

    compute_D19_Limestome();
    compute_F19_Sand();
    compute_G19_Iron();
    compute_E19_Shale();

    compute_total_C16();
    compute_total_C17();
    compute_total_C18();
    compute_total_C19();

    compute_Q31_LOI();
    compute_R31_total();
    compute_S31_LSF();
    compute_T31_HM();
    compute_U31_SM();
    compute_V31_AM();

    compute_H35_SiO2();
    compute_I35_Al2O3();
    compute_J35_Fe2O3();
    compute_K35_CaO();
    compute_L35_MgO();
    compute_M35_Na2O();
    compute_N35_K2O();
    compute_O35_SO3();
    compute_P35_Cl();
    compute_Q35_ECC_total();
    compute_S35_LSF();
    compute_T35_HM();
    compute_U35_SM();
    compute_V35_AM();

    compute_K38_DOC();
    compute_M38_C3Snet();
    compute_N38_C2S();
    compute_O38_C3A();
    compute_P38_C4AF();
    compute_Q38_Sulfur_Alkali_ratio();
    compute_R38_total_Alkali();
    compute_S38_Liquid_Phase();
    compute_T38_Coating_Index();

    checkNan();
  }

  function clearall() {
    setResult_total_C15(0.0);
    setResulttotal_C16(0.0);
    setResulttotal_C17(0.0);
    setResulttotal_C18(0.0);
    setResulttotal_C19(0.0);
    setD15(0.0);
    setE15(0.0);
    setF15(0.0);
    setG15(0.0);
    setH15_SiO2(0.0);
    setH16_SiO2(0.0);
    setH17_SiO2(0.0);
    setH18_SiO2(0.0);
    setI15_Al2O3(0.0);
    setI16_Al2O3(0.0);
    setI17_Al2O3(0.0);
    setI18_Al2O3(0.0);
    setJ15_Fe2O3(0.0);
    setJ16_Fe2O3(0.0);
    setJ17_Fe2O3(0.0);
    setJ18_Fe2O3(0.0);
    setK15_CaO(0.0);
    setK16_CaO(0.0);
    setK17_CaO(0.0);
    setK18_CaO(0.0);
    setL15_MgO(0.0);
    setL16_MgO(0.0);
    setL17_MgO(0.0);
    setL18_MgO(0.0);
    setM15_Na2O(0.0);
    setM16_Na2O(0.0);
    setM17_Na2O(0.0);
    setM18_Na2O(0.0);
    setN15_K2O(0.0);
    setN16_K2O(0.0);
    setN17_K2O(0.0);
    setN18_K2O(0.0);
    setO15_SO3(0.0);
    setO16_SO3(0.0);
    setO17_SO3(0.0);
    setO18_SO3(0.0);
    setP15_Cl(0.0);
    setP16_Cl(0.0);
    setP17_Cl(0.0);
    setP18_Cl(0.0);
    setQ15_LOI(0.0);
    setQ16_LOI(0.0);
    setQ17_LOI(0.0);
    setQ18_LOI(0.0);
    setR15_XRFtotal(0.0);
    setR16_XRFtotal(0.0);
    setR17_XRFtotal(0.0);
    setR18_XRFtotal(0.0);
    setS15_LSF(0.0);
    setS16_LSF(0.0);
    setS17_LSF(0.0);
    setS18_LSF(0.0);
    setT15_HM(0.0);
    setT16_HM(0.0);
    setT17_HM(0.0);
    setT18_HM(0.0);
    setU15_SM(0.0);
    setU16_SM(0.0);
    setU17_SM(0.0);
    setU18_SM(0.0);
    setV15_AM(0.0);
    setV16_AM(0.0);
    setV17_AM(0.0);
    setV18_AM(0.0);
    setD19_Limestome(0.0);
    setE19_Shale(0.0);
    setF19_Sand(0.0);
    setG19_Iron(0.0);
    setD16_Limestome(0.0);
    setD17_Limestome(0.0);
    setD18_Limestome(0.0);
    setE16_Shale(0.0);
    setE17_Shale(0.0);
    setE18_Shale(0.0);
    setF16_Sand(0.0);
    setF17_Sand(0.0);
    setF18_Sand(0.0);
    setG16_Iron(0.0);
    setG17_Iron(0.0);
    setG18_Iron(0.0);
    setD20_AVG(0.0);
    setE20_AVG(0.0);
    setF20_AVG(0.0);
    setG20_AVG(0.0);
    setH20_AVG(0.0);
    setI20_AVG(0.0);
    setJ20_AVG(0.0);
    setK20_AVG(0.0);
    setL20_AVG(0.0);
    setM20_AVG(0.0);
    setN20_AVG(0.0);
    setO20_AVG(0.0);
    setP20_AVG(0.0);
    setQ20_AVG(0.0);
    setR20_AVG(0.0);
    setS20_AVG(0.0);
    setT20_AVG(0.0);
    setU20_AVG(0.0);
    setV20_AVG(0.0);
    setD20_STDEV(0.0);
    setE20_STDEV(0.0);
    setF20_STDEV(0.0);
    setG20_STDEV(0.0);
    setH20_STDEV(0.0);
    setI20_STDEV(0.0);
    setJ20_STDEV(0.0);
    setK20_STDEV(0.0);
    setL20_STDEV(0.0);
    setM20_STDEV(0.0);
    setN20_STDEV(0.0);
    setO20_STDEV(0.0);
    setP20_STDEV(0.0);
    setQ20_STDEV(0.0);
    setR20_STDEV(0.0);
    setS20_STDEV(0.0);
    setT20_STDEV(0.0);
    setU20_STDEV(0.0);
    setV20_STDEV(0.0);
    setD20_MIN(0.0);
    setE20_MIN(0.0);
    setF20_MIN(0.0);
    setG20_MIN(0.0);
    setH20_MIN(0.0);
    setI20_MIN(0.0);
    setJ20_MIN(0.0);
    setK20_MIN(0.0);
    setL20_MIN(0.0);
    setM20_MIN(0.0);
    setN20_MIN(0.0);
    setO20_MIN(0.0);
    setP20_MIN(0.0);
    setQ20_MIN(0.0);
    setR20_MIN(0.0);
    setS20_MIN(0.0);
    setT20_MIN(0.0);
    setU20_MIN(0.0);
    setV20_MIN(0.0);
    setD20_MAX(0.0);
    setE20_MAX(0.0);
    setF20_MAX(0.0);
    setG20_MAX(0.0);
    setH20_MAX(0.0);
    setI20_MAX(0.0);
    setJ20_MAX(0.0);
    setK20_MAX(0.0);
    setL20_MAX(0.0);
    setM20_MAX(0.0);
    setN20_MAX(0.0);
    setO20_MAX(0.0);
    setP20_MAX(0.0);
    setQ20_MAX(0.0);
    setR20_MAX(0.0);
    setS20_MAX(0.0);
    setT20_MAX(0.0);
    setU20_MAX(0.0);
    setV20_MAX(0.0);
    setC30_LSF_PR(0.0);
    setC31_SM_PR(0.0);
    setC32_AM_PR(0.0);
    setF30_LSF_TG(0.0);
    setF31_SM_TG(0.0);
    setF32_AM_TG(0.0);
    setE33_Clinker_Factor(0.0);
    setE34_RawMixType("");
    setH31_SiO2(0.0);
    setI31_Al2O3(0.0);
    setJ31_Fe2O3(0.0);
    setK31_CaO(0.0);
    setL31_MgO(0.0);
    setM31_Na2O(0.0);
    setN31_K2O(0.0);
    setO31_SO3(0.0);
    setP31_Cl(0.0);
    setQ31_LOI(0.0);
    setR31_total(0.0);
    setS31_LSF(0.0);
    setT31_HM(0.0);
    setU31_SM(0.0);
    setV31_AM(0.0);
    setH35_SiO2(0.0);
    setI35_Al2O3(0.0);
    setJ35_Fe2O3(0.0);
    setK35_CaO(0.0);
    setL35_MgO(0.0);
    setM35_Na2O(0.0);
    setN35_K2O(0.0);
    setO35_SO3(0.0);
    setP35_Cl(0.0);
    setQ35_ECC_total(0.0);
    setS35_LSF(0.0);
    setT35_HM(0.0);
    setU35_SM(0.0);
    setV35_AM(0.0);
    setL38_KL_LOI(0.0);
    setV38_LOI(0.0);
    setK38_DOC(0.0);
    setM38_C3Snet(0.0);
    setN38_C2S(0.0);
    setO38_C3A(0.0);
    setP38_C4AF(0.0);
    setQ38_Sulfur_Alkali_ratio(0.0);
    setR38_total_Alkali(0.0);
    setS38_Liquid_Phase(0.0);
    setT38_Coating_Index(0.0);
  }

  function emptyinput() {
    D16_Limestome <= 0 ? setD16_Limestome("") : D16_Limestome;
    D17_Limestome <= 0 ? setD17_Limestome("") : D17_Limestome;
    D18_Limestome <= 0 ? setD18_Limestome("") : D18_Limestome;
    D19_Limestome <= 0 ? setD19_Limestome("") : D19_Limestome;
    E16_Shale <= 0 ? setE16_Shale("") : E16_Shale;
    E17_Shale <= 0 ? setE17_Shale("") : E17_Shale;
    E18_Shale <= 0 ? setE18_Shale("") : E18_Shale;
    F16_Sand <= 0 ? setF16_Sand("") : F16_Sand;
    F17_Sand <= 0 ? setF17_Sand("") : F17_Sand;
    F18_Sand <= 0 ? setF18_Sand("") : F18_Sand;
    G16_Iron <= 0 ? setG16_Iron("") : G16_Iron;
    G17_Iron <= 0 ? setG17_Iron("") : G17_Iron;
    G18_Iron <= 0 ? setG18_Iron("") : G18_Iron;
    F19_Sand <= 0 ? setF19_Sand("") : F19_Sand;
    E19_Shale <= 0 ? setE19_Shale("") : E19_Shale;
    G19_Iron <= 0 ? setG19_Iron("") : G19_Iron;
    D15 <= 0 ? setD15("") : D15;
    E15 <= 0 ? setE15("") : E15;
    F15 <= 0 ? setF15("") : F15;
    G15 <= 0 ? setG15("") : G15;
    H15_SiO2 <= 0 ? setH15_SiO2("") : H15_SiO2;
    I15_Al2O3 <= 0 ? setI15_Al2O3("") : I15_Al2O3;
    J15_Fe2O3 <= 0 ? setJ15_Fe2O3("") : J15_Fe2O3;
    K15_CaO <= 0 ? setK15_CaO("") : K15_CaO;
    L15_MgO <= 0 ? setL15_MgO("") : L15_MgO;
    M15_Na2O <= 0 ? setM15_Na2O("") : M15_Na2O;
    N15_K2O <= 0 ? setN15_K2O("") : N15_K2O;
    O15_SO3 <= 0 ? setO15_SO3("") : O15_SO3;
    P15_Cl <= 0 ? setP15_Cl("") : P15_Cl;
    H16_SiO2 <= 0 ? setH16_SiO2("") : H16_SiO2;
    I16_Al2O3 <= 0 ? setI16_Al2O3("") : I16_Al2O3;
    J16_Fe2O3 <= 0 ? setJ16_Fe2O3("") : J16_Fe2O3;
    K16_CaO <= 0 ? setK16_CaO("") : K16_CaO;
    L16_MgO <= 0 ? setL16_MgO("") : L16_MgO;
    M16_Na2O <= 0 ? setM16_Na2O("") : M16_Na2O;
    N16_K2O <= 0 ? setN16_K2O("") : N16_K2O;
    O16_SO3 <= 0 ? setO16_SO3("") : O16_SO3;
    P16_Cl <= 0 ? setP16_Cl("") : P16_Cl;
    H17_SiO2 <= 0 ? setH17_SiO2("") : H17_SiO2;
    I17_Al2O3 <= 0 ? setI17_Al2O3("") : I17_Al2O3;
    J17_Fe2O3 <= 0 ? setJ17_Fe2O3("") : J17_Fe2O3;
    K17_CaO <= 0 ? setK17_CaO("") : K17_CaO;
    L17_MgO <= 0 ? setL17_MgO("") : L17_MgO;
    M17_Na2O <= 0 ? setM17_Na2O("") : M17_Na2O;
    N17_K2O <= 0 ? setN17_K2O("") : N17_K2O;
    O17_SO3 <= 0 ? setO17_SO3("") : O17_SO3;
    P17_Cl <= 0 ? setP17_Cl("") : P17_Cl;
    H18_SiO2 <= 0 ? setH18_SiO2("") : H18_SiO2;
    I18_Al2O3 <= 0 ? setI18_Al2O3("") : I18_Al2O3;
    J18_Fe2O3 <= 0 ? setJ18_Fe2O3("") : J18_Fe2O3;
    K18_CaO <= 0 ? setK18_CaO("") : K18_CaO;
    L18_MgO <= 0 ? setL18_MgO("") : L18_MgO;
    M18_Na2O <= 0 ? setM18_Na2O("") : M18_Na2O;
    N18_K2O <= 0 ? setN18_K2O("") : N18_K2O;
    O18_SO3 <= 0 ? setO18_SO3("") : O18_SO3;
    P18_Cl <= 0 ? setP18_Cl("") : P18_Cl;
    C30_LSF_PR <= 0 ? setC30_LSF_PR("") : C30_LSF_PR;
    C31_SM_PR <= 0 ? setC31_SM_PR("") : C31_SM_PR;
    C32_AM_PR <= 0 ? setC32_AM_PR("") : C32_AM_PR;
    E33_Clinker_Factor <= 0 ? setE33_Clinker_Factor("") : E33_Clinker_Factor;
    E34_RawMixType <= 0 ? setE34_RawMixType("") : E34_RawMixType;
    F30_LSF_TG <= 0 ? setF30_LSF_TG("") : F30_LSF_TG;
    F31_SM_TG <= 0 ? setF31_SM_TG("") : F31_SM_TG;
    F32_AM_TG <= 0 ? setF32_AM_TG("") : F32_AM_TG;
    H31_SiO2 <= 0 ? setH31_SiO2("") : H31_SiO2;
    I31_Al2O3 <= 0 ? setI31_Al2O3("") : I31_Al2O3;
    J31_Fe2O3 <= 0 ? setJ31_Fe2O3("") : J31_Fe2O3;
    K31_CaO <= 0 ? setK31_CaO("") : K31_CaO;
    L31_MgO <= 0 ? setL31_MgO("") : L31_MgO;
    M31_Na2O <= 0 ? setM31_Na2O("") : M31_Na2O;
    N31_K2O <= 0 ? setN31_K2O("") : N31_K2O;
    O31_SO3 <= 0 ? setO31_SO3("") : O31_SO3;
    P31_Cl <= 0 ? setP31_Cl("") : P31_Cl;
    L38_KL_LOI <= 0 ? setL38_KL_LOI("") : L38_KL_LOI;
    V38_LOI <= 0 ? setV38_LOI("") : V38_LOI;
  }

  //END  MATERIAL ANALYSIS USEStates

  // RAMILL MIX D
  const SavedDataList2 = () => {
    useEffect(() => {
      loadData2();
    }, []);

    const loadData2 = () => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM rmdTable ", [], (_, { rows }) => {
          const items = rows._array;
          console.log("Row list RMD: " + rows);
          setDataList2(items);
        });
      });
    };
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS rmdTable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NULL,C8_MIX_RDFC NUMERIC, C9_SiO2_RDFC NUMERIC,C10_Al2O3_RDFC      NUMERIC,C11_Fe2O3_RDFC NUMERIC,C12_CaO_RDFC NUMERIC,C13_MgO_RDFC NUMERIC,C14_Na2O_RDFC NUMERIC,C15_K2O_RDFC NUMERIC,C16_SO3_RDFC NUMERIC,C17_LOI_RDFC NUMERIC,D8_MIX_RDFC NUMERIC,D9_SiO2_RDFC NUMERIC,D10_Al2O3_RDFC NUMERIC,D11_Fe2O3_RDFC NUMERIC,D12_CaO_RDFC NUMERIC,D13_MgO_RDFC NUMERIC,D14_Na2O_RDFC NUMERIC,D15_K2O_RDFC NUMERIC,D16_SO3_RDFC NUMERIC,D17_LOI_RDFC NUMERIC,E8_MIX_RDFC NUMERIC,E9_SiO2_RDFC NUMERIC,E10_Al2O3_RDFC NUMERIC,E11_Fe2O3_RDFC NUMERIC,E12_CaO_RDFC NUMERIC,E13_MgO_RDFC NUMERIC,E14_Na2O_RDFC       NUMERIC,E15_K2O_RDFC NUMERIC,E16_SO3_RDFC NUMERIC,E17_LOI_RDFC NUMERIC,F8_MIX_RDFC NUMERIC,F9_SiO2_RDFC NUMERIC,F10_Al2O3_RDFC NUMERIC,F11_Fe2O3_RDFC NUMERIC,F12_CaO_RDFC NUMERIC,F13_MgO_RDFC NUMERIC,F14_Na2O_RDFC NUMERIC,F15_K2O_RDFC NUMERIC,F16_SO3_RDFC NUMERIC,F17_LOI_RDFC NUMERIC,I14_Lime_Saturation NUMERIC,I17_Silica_Modulus  NUMERIC,I20_Alumina_Modulus NUMERIC, DT DATETIME)"
      );
    });
    console.log("Table Created");
    clearall2();

    setIsLoading(false);

    loadall2();
  }, [db]);

  //INSERT DATA
  const addData2 = () => {
    const date = new Date();

    const formattedDate = date.toLocaleString();
    const formattedDate2 = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    setIsLoading(true);
    console.log("Trying to insert data...");

    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO rmdTable (name,C8_MIX_RDFC , C9_SiO2_RDFC ,C10_Al2O3_RDFC      ,C11_Fe2O3_RDFC ,C12_CaO_RDFC ,C13_MgO_RDFC ,C14_Na2O_RDFC ,C15_K2O_RDFC ,C16_SO3_RDFC ,C17_LOI_RDFC ,D8_MIX_RDFC ,D9_SiO2_RDFC ,D10_Al2O3_RDFC ,D11_Fe2O3_RDFC ,D12_CaO_RDFC ,D13_MgO_RDFC ,D14_Na2O_RDFC ,D15_K2O_RDFC ,D16_SO3_RDFC ,D17_LOI_RDFC ,E8_MIX_RDFC ,E9_SiO2_RDFC ,E10_Al2O3_RDFC ,E11_Fe2O3_RDFC ,E12_CaO_RDFC ,E13_MgO_RDFC ,E14_Na2O_RDFC       ,E15_K2O_RDFC ,E16_SO3_RDFC ,E17_LOI_RDFC ,F8_MIX_RDFC ,F9_SiO2_RDFC ,F10_Al2O3_RDFC ,F11_Fe2O3_RDFC ,F12_CaO_RDFC ,F13_MgO_RDFC ,F14_Na2O_RDFC ,F15_K2O_RDFC ,F16_SO3_RDFC ,F17_LOI_RDFC ,I14_Lime_Saturation ,I17_Silica_Modulus  ,I20_Alumina_Modulus , DT) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          "RAWMILL_" + formattedDate,
          C8_MIX_RDFC,
          C9_SiO2_RDFC,
          C10_Al2O3_RDFC,
          C11_Fe2O3_RDFC,
          C12_CaO_RDFC,
          C13_MgO_RDFC,
          C14_Na2O_RDFC,
          C15_K2O_RDFC,
          C16_SO3_RDFC,
          C17_LOI_RDFC,
          D8_MIX_RDFC,
          D9_SiO2_RDFC,
          D10_Al2O3_RDFC,
          D11_Fe2O3_RDFC,
          D12_CaO_RDFC,
          D13_MgO_RDFC,
          D14_Na2O_RDFC,
          D15_K2O_RDFC,
          D16_SO3_RDFC,
          D17_LOI_RDFC,
          E8_MIX_RDFC,
          E9_SiO2_RDFC,
          E10_Al2O3_RDFC,
          E11_Fe2O3_RDFC,
          E12_CaO_RDFC,
          E13_MgO_RDFC,
          E14_Na2O_RDFC,
          E15_K2O_RDFC,
          E16_SO3_RDFC,
          E17_LOI_RDFC,
          F8_MIX_RDFC,
          F9_SiO2_RDFC,
          F10_Al2O3_RDFC,
          F11_Fe2O3_RDFC,
          F12_CaO_RDFC,
          F13_MgO_RDFC,
          F14_Na2O_RDFC,
          F15_K2O_RDFC,
          F16_SO3_RDFC,
          F17_LOI_RDFC,
          I14_Lime_Saturation,
          I17_Silica_Modulus,
          I20_Alumina_Modulus,
          formattedDate2,
        ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            alert("Save RMD Complete!");
            setIsLoading(false);
          }
          console.log("Rows affected:", rowsAffected);
          clearall2();
        },
        (_, error) => {
          alert("Save RMD  Error: ", error);
        }
      );
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };

  //UPDATE DATA
  const updateData2 = (id) => {
    console.log("Updating data...");
    setIsLoading(true);
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE rmdTable SET C8_MIX_RDFC = ?, C9_SiO2_RDFC = ?,C10_Al2O3_RDFC      = ?,C11_Fe2O3_RDFC = ?,C12_CaO_RDFC = ?,C13_MgO_RDFC = ?,C14_Na2O_RDFC = ?,C15_K2O_RDFC = ?,C16_SO3_RDFC = ?,C17_LOI_RDFC = ?,D8_MIX_RDFC = ?,D9_SiO2_RDFC = ?,D10_Al2O3_RDFC = ?,D11_Fe2O3_RDFC = ?,D12_CaO_RDFC = ?,D13_MgO_RDFC = ?,D14_Na2O_RDFC = ?,D15_K2O_RDFC = ?,D16_SO3_RDFC = ?,D17_LOI_RDFC = ?,E8_MIX_RDFC = ?,E9_SiO2_RDFC = ?,E10_Al2O3_RDFC = ?,E11_Fe2O3_RDFC = ?,E12_CaO_RDFC = ?,E13_MgO_RDFC = ?,E14_Na2O_RDFC       = ?,E15_K2O_RDFC = ?,E16_SO3_RDFC = ?,E17_LOI_RDFC = ?,F8_MIX_RDFC = ?,F9_SiO2_RDFC = ?,F10_Al2O3_RDFC = ?,F11_Fe2O3_RDFC = ?,F12_CaO_RDFC = ?,F13_MgO_RDFC = ?,F14_Na2O_RDFC = ?,F15_K2O_RDFC = ?,F16_SO3_RDFC = ?,F17_LOI_RDFC = ?,I14_Lime_Saturation = ?,I17_Silica_Modulus  = ?,I20_Alumina_Modulus = ?  WHERE id = ?",
        [
          C8_MIX_RDFC,
          C9_SiO2_RDFC,
          C10_Al2O3_RDFC,
          C11_Fe2O3_RDFC,
          C12_CaO_RDFC,
          C13_MgO_RDFC,
          C14_Na2O_RDFC,
          C15_K2O_RDFC,
          C16_SO3_RDFC,
          C17_LOI_RDFC,
          D8_MIX_RDFC,
          D9_SiO2_RDFC,
          D10_Al2O3_RDFC,
          D11_Fe2O3_RDFC,
          D12_CaO_RDFC,
          D13_MgO_RDFC,
          D14_Na2O_RDFC,
          D15_K2O_RDFC,
          D16_SO3_RDFC,
          D17_LOI_RDFC,
          E8_MIX_RDFC,
          E9_SiO2_RDFC,
          E10_Al2O3_RDFC,
          E11_Fe2O3_RDFC,
          E12_CaO_RDFC,
          E13_MgO_RDFC,
          E14_Na2O_RDFC,
          E15_K2O_RDFC,
          E16_SO3_RDFC,
          E17_LOI_RDFC,
          F8_MIX_RDFC,
          F9_SiO2_RDFC,
          F10_Al2O3_RDFC,
          F11_Fe2O3_RDFC,
          F12_CaO_RDFC,
          F13_MgO_RDFC,
          F14_Na2O_RDFC,
          F15_K2O_RDFC,
          F16_SO3_RDFC,
          F17_LOI_RDFC,
          I14_Lime_Saturation,
          I17_Silica_Modulus,
          I20_Alumina_Modulus,
          id,
        ],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            alert("Update RMD Complete!");
            setIsLoading(false);
          }
        },
        (txObj, error) => alert("Update RMD Error: " + error)
      );
    });
  };

  //DELETE DATA
  const deleteData2 = (id) => {
    setIsLoading(true);
    // alert("Loading selected data...");
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM rmdTable WHERE id = ?",
        [id],
        (_, { rows }) => {
          const items = rows._array;
          setDataList2(items);
          alert("ID: " + id + " Data Deleted!");
          setIsLoading(false);
        }
      );
    });
    console.log("Deletion complete!");
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };
  //LOAD SELECT DATA
  const loadselectData2 = (id) => {
    setIsLoading(true);
    // alert("Loading selected data...");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM rmdTable WHERE id = ?",
        [id],
        (_, { rows }) => {
          const items = rows._array;
          setDataList2(items);
          if (setDataList2 != null) {
            setIsLoading(false);
          }
          alert("Data RMD Loaded!");
          setIsLoading(false);
        }
      );
    });
    console.log("Done loading data!");
    setTimeout(() => {
      setIsLoading(false);
    }, 60000);
  };

  function selecteddata2() {
    dataList2.map(
      (item) => (
        setC8_MIX_RDFC(item.C8_MIX_RDFC.toFixed(2)),
        setC9_SiO2_RDFC(item.C9_SiO2_RDFC.toFixed(2)),
        setC10_Al2O3_RDFC(item.C10_Al2O3_RDFC.toFixed(2)),
        setC11_Fe2O3_RDFC(item.C11_Fe2O3_RDFC.toFixed(2)),
        setC12_CaO_RDFC(item.C12_CaO_RDFC.toFixed(2)),
        setC13_MgO_RDFC(item.C13_MgO_RDFC.toFixed(2)),
        setC14_Na2O_RDFC(item.C14_Na2O_RDFC.toFixed(2)),
        setC15_K2O_RDFC(item.C15_K2O_RDFC.toFixed(2)),
        setC16_SO3_RDFC(item.C16_SO3_RDFC.toFixed(2)),
        setC17_LOI_RDFC(item.C17_LOI_RDFC.toFixed(2)),
        setD8_MIX_RDFC(item.D8_MIX_RDFC.toFixed(2)),
        setD9_SiO2_RDFC(item.D9_SiO2_RDFC.toFixed(2)),
        setD10_Al2O3_RDFC(item.D10_Al2O3_RDFC.toFixed(2)),
        setD11_Fe2O3_RDFC(item.D11_Fe2O3_RDFC.toFixed(2)),
        setD12_CaO_RDFC(item.D12_CaO_RDFC.toFixed(2)),
        setD13_MgO_RDFC(item.D13_MgO_RDFC.toFixed(2)),
        setD14_Na2O_RDFC(item.D14_Na2O_RDFC.toFixed(2)),
        setD15_K2O_RDFC(item.D15_K2O_RDFC.toFixed(2)),
        setD16_SO3_RDFC(item.D16_SO3_RDFC.toFixed(2)),
        setD17_LOI_RDFC(item.D17_LOI_RDFC.toFixed(2)),
        setE8_MIX_RDFC(item.E8_MIX_RDFC.toFixed(2)),
        setE9_SiO2_RDFC(item.E9_SiO2_RDFC.toFixed(2)),
        setE10_Al2O3_RDFC(item.E10_Al2O3_RDFC.toFixed(2)),
        setE11_Fe2O3_RDFC(item.E11_Fe2O3_RDFC.toFixed(2)),
        setE12_CaO_RDFC(item.E12_CaO_RDFC.toFixed(2)),
        setE13_MgO_RDFC(item.E13_MgO_RDFC.toFixed(2)),
        setE14_Na2O_RDFC(item.E14_Na2O_RDFC.toFixed(2)),
        setE15_K2O_RDFC(item.E15_K2O_RDFC.toFixed(2)),
        setE16_SO3_RDFC(item.E16_SO3_RDFC.toFixed(2)),
        setE17_LOI_RDFC(item.E17_LOI_RDFC.toFixed(2)),
        setF8_MIX_RDFC(item.F8_MIX_RDFC.toFixed(2)),
        setF9_SiO2_RDFC(item.F9_SiO2_RDFC.toFixed(2)),
        setF10_Al2O3_RDFC(item.F10_Al2O3_RDFC.toFixed(2)),
        setF11_Fe2O3_RDFC(item.F11_Fe2O3_RDFC.toFixed(2)),
        setF12_CaO_RDFC(item.F12_CaO_RDFC.toFixed(2)),
        setF13_MgO_RDFC(item.F13_MgO_RDFC.toFixed(2)),
        setF14_Na2O_RDFC(item.F14_Na2O_RDFC.toFixed(2)),
        setF15_K2O_RDFC(item.F15_K2O_RDFC.toFixed(2)),
        setF16_SO3_RDFC(item.F16_SO3_RDFC.toFixed(2)),
        setF17_LOI_RDFC(item.F17_LOI_RDFC.toFixed(2)),
        setI14_Lime_Saturation(item.I14_Lime_Saturation.toFixed(2)),
        setI17_Silica_Modulus(item.I17_Silica_Modulus.toFixed(2)),
        setI20_Alumina_Modulus(item.I20_Alumina_Modulus.toFixed(2))
      )
    );
    useEffect(() => {
      loadall2();
    }, []);
  }
  //END SQLITE

  //RMD FUNCTIONS AND FORMULAS
  const compute_G8_MIX_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    G8_MIX_RDFC = C8_MIX_RDFC + D8_MIX_RDFC + E8_MIX_RDFC + F8_MIX_RDFC;

    setG8_MIX_RDFC(G8_MIX_RDFC.toFixed(2));
  };

  const compute_G9_SiO2_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D9_SiO2_RDFC = isNaN(parseFloat(D9_SiO2_RDFC))
      ? 0.0
      : parseFloat(D9_SiO2_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E9_SiO2_RDFC = isNaN(parseFloat(E9_SiO2_RDFC))
      ? 0.0
      : parseFloat(E9_SiO2_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G9_SiO2_RDFC =
      (C8_MIX_RDFC * C9_SiO2_RDFC +
        D8_MIX_RDFC * D9_SiO2_RDFC +
        E8_MIX_RDFC * E9_SiO2_RDFC +
        F8_MIX_RDFC * F9_SiO2_RDFC) /
      G8_MIX_RDFC;

    setG9_SiO2_RDFC(G9_SiO2_RDFC.toFixed(2));
  };
  const compute_G11_Fe2O3_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G11_Fe2O3_RDFC =
      (C8_MIX_RDFC * C11_Fe2O3_RDFC +
        D8_MIX_RDFC * D11_Fe2O3_RDFC +
        E8_MIX_RDFC * E11_Fe2O3_RDFC +
        F8_MIX_RDFC * F11_Fe2O3_RDFC) /
      G8_MIX_RDFC;

    setG11_Fe2O3_RDFC(G11_Fe2O3_RDFC.toFixed(2));
  };

  const compute_G12_CaO_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C12_CaO_RDFC = isNaN(parseFloat(C12_CaO_RDFC))
      ? 0.0
      : parseFloat(C12_CaO_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D12_CaO_RDFC = isNaN(parseFloat(D12_CaO_RDFC))
      ? 0.0
      : parseFloat(D12_CaO_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E12_CaO_RDFC = isNaN(parseFloat(E12_CaO_RDFC))
      ? 0.0
      : parseFloat(E12_CaO_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F12_CaO_RDFC = isNaN(parseFloat(F12_CaO_RDFC))
      ? 0.0
      : parseFloat(F12_CaO_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G12_CaO_RDFC =
      (C8_MIX_RDFC * C12_CaO_RDFC +
        D8_MIX_RDFC * D12_CaO_RDFC +
        E8_MIX_RDFC * E12_CaO_RDFC +
        F8_MIX_RDFC * F12_CaO_RDFC) /
      G8_MIX_RDFC;

    setG12_CaO_RDFC(G12_CaO_RDFC.toFixed(2));
  };

  const compute_G13_MgO_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C13_MgO_RDFC = isNaN(parseFloat(C13_MgO_RDFC))
      ? 0.0
      : parseFloat(C13_MgO_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D13_MgO_RDFC = isNaN(parseFloat(D13_MgO_RDFC))
      ? 0.0
      : parseFloat(D13_MgO_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E13_MgO_RDFC = isNaN(parseFloat(E13_MgO_RDFC))
      ? 0.0
      : parseFloat(E13_MgO_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F13_MgO_RDFC = isNaN(parseFloat(F13_MgO_RDFC))
      ? 0.0
      : parseFloat(F13_MgO_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G13_MgO_RDFC =
      (C8_MIX_RDFC * C13_MgO_RDFC +
        D8_MIX_RDFC * D13_MgO_RDFC +
        E8_MIX_RDFC * E13_MgO_RDFC +
        F8_MIX_RDFC * F13_MgO_RDFC) /
      G8_MIX_RDFC;

    setG13_MgO_RDFC(G13_MgO_RDFC.toFixed(2));
  };

  const compute_G14_Na2O_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C14_Na2O_RDFC = isNaN(parseFloat(C14_Na2O_RDFC))
      ? 0.0
      : parseFloat(C14_Na2O_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D14_Na2O_RDFC = isNaN(parseFloat(D14_Na2O_RDFC))
      ? 0.0
      : parseFloat(D14_Na2O_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E14_Na2O_RDFC = isNaN(parseFloat(E14_Na2O_RDFC))
      ? 0.0
      : parseFloat(E14_Na2O_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F14_Na2O_RDFC = isNaN(parseFloat(F14_Na2O_RDFC))
      ? 0.0
      : parseFloat(F14_Na2O_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G14_Na2O_RDFC =
      (C8_MIX_RDFC * C14_Na2O_RDFC +
        D8_MIX_RDFC * D14_Na2O_RDFC +
        E8_MIX_RDFC * E14_Na2O_RDFC +
        F8_MIX_RDFC * F14_Na2O_RDFC) /
      G8_MIX_RDFC;

    setG14_Na2O_RDFC(G14_Na2O_RDFC.toFixed(2));
  };
  const compute_G15_K2O_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C15_K2O_RDFC = isNaN(parseFloat(C15_K2O_RDFC))
      ? 0.0
      : parseFloat(C15_K2O_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D15_K2O_RDFC = isNaN(parseFloat(D15_K2O_RDFC))
      ? 0.0
      : parseFloat(D15_K2O_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E15_K2O_RDFC = isNaN(parseFloat(E15_K2O_RDFC))
      ? 0.0
      : parseFloat(E15_K2O_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F15_K2O_RDFC = isNaN(parseFloat(F15_K2O_RDFC))
      ? 0.0
      : parseFloat(F15_K2O_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G15_K2O_RDFC =
      (C8_MIX_RDFC * C15_K2O_RDFC +
        D8_MIX_RDFC * D15_K2O_RDFC +
        E8_MIX_RDFC * E15_K2O_RDFC +
        F8_MIX_RDFC * F15_K2O_RDFC) /
      G8_MIX_RDFC;

    setG15_K2O_RDFC(G15_K2O_RDFC.toFixed(2));
  };
  const compute_G16_SO3_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C16_SO3_RDFC = isNaN(parseFloat(C16_SO3_RDFC))
      ? 0.0
      : parseFloat(C16_SO3_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D16_SO3_RDFC = isNaN(parseFloat(D16_SO3_RDFC))
      ? 0.0
      : parseFloat(D16_SO3_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E16_SO3_RDFC = isNaN(parseFloat(E16_SO3_RDFC))
      ? 0.0
      : parseFloat(E16_SO3_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F16_SO3_RDFC = isNaN(parseFloat(F16_SO3_RDFC))
      ? 0.0
      : parseFloat(F16_SO3_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G16_SO3_RDFC =
      (C8_MIX_RDFC * C16_SO3_RDFC +
        D8_MIX_RDFC * D16_SO3_RDFC +
        E8_MIX_RDFC * E16_SO3_RDFC +
        F8_MIX_RDFC * F16_SO3_RDFC) /
      G8_MIX_RDFC;

    setG16_SO3_RDFC(G16_SO3_RDFC.toFixed(2));
  };
  const compute_G17_LOI_RDFC = () => {
    C8_MIX_RDFC = isNaN(parseFloat(C8_MIX_RDFC))
      ? 0.0
      : parseFloat(C8_MIX_RDFC);
    C17_LOI_RDFC = isNaN(parseFloat(C17_LOI_RDFC))
      ? 0.0
      : parseFloat(C17_LOI_RDFC);
    D8_MIX_RDFC = isNaN(parseFloat(D8_MIX_RDFC))
      ? 0.0
      : parseFloat(D8_MIX_RDFC);
    D17_LOI_RDFC = isNaN(parseFloat(D17_LOI_RDFC))
      ? 0.0
      : parseFloat(D17_LOI_RDFC);
    E8_MIX_RDFC = isNaN(parseFloat(E8_MIX_RDFC))
      ? 0.0
      : parseFloat(E8_MIX_RDFC);
    E17_LOI_RDFC = isNaN(parseFloat(E17_LOI_RDFC))
      ? 0.0
      : parseFloat(E17_LOI_RDFC);
    F8_MIX_RDFC = isNaN(parseFloat(F8_MIX_RDFC))
      ? 0.0
      : parseFloat(F8_MIX_RDFC);
    F17_LOI_RDFC = isNaN(parseFloat(F17_LOI_RDFC))
      ? 0.0
      : parseFloat(F17_LOI_RDFC);
    G8_MIX_RDFC = isNaN(parseFloat(G8_MIX_RDFC))
      ? 0.0
      : parseFloat(G8_MIX_RDFC);
    G17_LOI_RDFC =
      (C8_MIX_RDFC * C17_LOI_RDFC +
        D8_MIX_RDFC * D17_LOI_RDFC +
        E8_MIX_RDFC * E17_LOI_RDFC +
        F8_MIX_RDFC * F17_LOI_RDFC) /
      G8_MIX_RDFC;

    setG17_LOI_RDFC(G17_LOI_RDFC.toFixed(2));
  };

  //all fix cell
  const compute_G18_TOTAL_RDFC = () => {
    G9_SiO2_RDFC = isNaN(parseFloat(G9_SiO2_RDFC))
      ? 0.0
      : parseFloat(G9_SiO2_RDFC);
    G10_Al2O3_RDFC = isNaN(parseFloat(G10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(G10_Al2O3_RDFC);
    G11_Fe2O3_RDFC = isNaN(parseFloat(G11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(G11_Fe2O3_RDFC);
    G12_CaO_RDFC = isNaN(parseFloat(G12_CaO_RDFC))
      ? 0.0
      : parseFloat(G12_CaO_RDFC);
    G13_MgO_RDFC = isNaN(parseFloat(G13_MgO_RDFC))
      ? 0.0
      : parseFloat(G13_MgO_RDFC);
    G14_Na2O_RDFC = isNaN(parseFloat(G14_Na2O_RDFC))
      ? 0.0
      : parseFloat(G14_Na2O_RDFC);
    G15_K2O_RDFC = isNaN(parseFloat(G15_K2O_RDFC))
      ? 0.0
      : parseFloat(G15_K2O_RDFC);
    G16_SO3_RDFC = isNaN(parseFloat(G16_SO3_RDFC))
      ? 0.0
      : parseFloat(G16_SO3_RDFC);
    G17_LOI_RDFC = isNaN(parseFloat(G17_LOI_RDFC))
      ? 0.0
      : parseFloat(G17_LOI_RDFC);
    G18_TOTAL_RDFC =
      G9_SiO2_RDFC +
      G10_Al2O3_RDFC +
      G11_Fe2O3_RDFC +
      G12_CaO_RDFC +
      G13_MgO_RDFC +
      G14_Na2O_RDFC +
      G15_K2O_RDFC +
      G16_SO3_RDFC +
      G17_LOI_RDFC;

    setG18_TOTAL_RDFC(G18_TOTAL_RDFC.toFixed(2));
  };
  const compute_G19_LSF_RDFC = () => {
    G12_CaO_RDFC = isNaN(parseFloat(G12_CaO_RDFC))
      ? 0.0
      : parseFloat(G12_CaO_RDFC);
    G9_SiO2_RDFC = isNaN(parseFloat(G9_SiO2_RDFC))
      ? 0.0
      : parseFloat(G9_SiO2_RDFC);
    G10_Al2O3_RDFC = isNaN(parseFloat(G10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(G10_Al2O3_RDFC);
    G11_Fe2O3_RDFC = isNaN(parseFloat(G11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(G11_Fe2O3_RDFC);
    G19_LSF_RDFC =
      (100 * G12_CaO_RDFC) /
      (2.8 * G9_SiO2_RDFC + 1.18 * G10_Al2O3_RDFC + 0.65 * G11_Fe2O3_RDFC);

    setG19_LSF_RDFC(G19_LSF_RDFC.toFixed(2));
  };
  const compute_G20_SM_RDFC = () => {
    G9_SiO2_RDFC = isNaN(parseFloat(G9_SiO2_RDFC))
      ? 0.0
      : parseFloat(G9_SiO2_RDFC);
    G10_Al2O3_RDFC = isNaN(parseFloat(G10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(G10_Al2O3_RDFC);
    G11_Fe2O3_RDFC = isNaN(parseFloat(G11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(G11_Fe2O3_RDFC);
    G20_SM_RDFC = G9_SiO2_RDFC / (G10_Al2O3_RDFC + G11_Fe2O3_RDFC);

    setG20_SM_RDFC(G20_SM_RDFC.toFixed(2));
  };
  const compute_G21_AM_RDFC = () => {
    G10_Al2O3_RDFC = isNaN(parseFloat(G10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(G10_Al2O3_RDFC);
    G11_Fe2O3_RDFC = isNaN(parseFloat(G11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(G11_Fe2O3_RDFC);
    G21_AM_RDFC = G10_Al2O3_RDFC / G11_Fe2O3_RDFC;

    setG21_AM_RDFC(G21_AM_RDFC.toFixed(2));
  };

  const I7_datenow = () => {
    //date now

    const date = new Date();
    const formattedDate2 = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    setI7_Date(formattedDate2);
  };

  //   COEFFICIENTS
  //all fix cell

  const compute_L8_a_L12_e = () => {
    setL8_a(1);
    setL9_b(1);
    setL10_c(1);
    setL11_d(1);
    setL12_e(100);
  };

  const compute_L13_f = () => {
    I20_Alumina_Modulus = isNaN(parseFloat(I20_Alumina_Modulus))
      ? 0.0
      : parseFloat(I20_Alumina_Modulus);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    L13_f = I20_Alumina_Modulus * C11_Fe2O3_RDFC - C10_Al2O3_RDFC;

    setL13_f(L13_f.toFixed(2));
  };

  const compute_L14_g = () => {
    I20_Alumina_Modulus = isNaN(parseFloat(I20_Alumina_Modulus))
      ? 0.0
      : parseFloat(I20_Alumina_Modulus);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);
    L14_g = I20_Alumina_Modulus * D11_Fe2O3_RDFC - D10_Al2O3_RDFC;

    setL14_g(L14_g.toFixed(2));
  };

  const compute_L15_h = () => {
    I20_Alumina_Modulus = isNaN(parseFloat(I20_Alumina_Modulus))
      ? 0.0
      : parseFloat(I20_Alumina_Modulus);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);
    L15_h = I20_Alumina_Modulus * E11_Fe2O3_RDFC - E10_Al2O3_RDFC;

    setL15_h(L15_h.toFixed(2));
  };
  const compute_L16_i = () => {
    I20_Alumina_Modulus = isNaN(parseFloat(I20_Alumina_Modulus))
      ? 0.0
      : parseFloat(I20_Alumina_Modulus);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);
    L16_i = I20_Alumina_Modulus * F11_Fe2O3_RDFC - F10_Al2O3_RDFC;

    setL16_i(L16_i.toFixed(2));
  };

  const compute_L17_k = () => {
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    L17_k =
      I17_Silica_Modulus * C10_Al2O3_RDFC +
      I17_Silica_Modulus * C11_Fe2O3_RDFC -
      C9_SiO2_RDFC;

    setL17_k(L17_k.toFixed(2));
  };
  const compute_L18_l = () => {
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);
    D9_SiO2_RDFC = isNaN(parseFloat(D9_SiO2_RDFC))
      ? 0.0
      : parseFloat(D9_SiO2_RDFC);
    L18_l =
      I17_Silica_Modulus * D10_Al2O3_RDFC +
      I17_Silica_Modulus * D11_Fe2O3_RDFC -
      D9_SiO2_RDFC;

    setL18_l(L18_l.toFixed(2));
  };
  const compute_L19_m = () => {
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);
    E9_SiO2_RDFC = isNaN(parseFloat(E9_SiO2_RDFC))
      ? 0.0
      : parseFloat(E9_SiO2_RDFC);
    L19_m =
      I17_Silica_Modulus * E10_Al2O3_RDFC +
      I17_Silica_Modulus * E11_Fe2O3_RDFC -
      E9_SiO2_RDFC;

    setL19_m(L19_m.toFixed(2));
  };
  const compute_L20_n = () => {
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);
    I17_Silica_Modulus = isNaN(parseFloat(I17_Silica_Modulus))
      ? 0.0
      : parseFloat(I17_Silica_Modulus);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);
    F9_SiO2_RDFC = isNaN(parseFloat(F9_SiO2_RDFC))
      ? 0.0
      : parseFloat(F9_SiO2_RDFC);
    L20_n =
      I17_Silica_Modulus * F10_Al2O3_RDFC +
      I17_Silica_Modulus * F11_Fe2O3_RDFC -
      F9_SiO2_RDFC;

    setL20_n(L20_n.toFixed(2));
  };
  const compute_L21_p = () => {
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);
    C12_CaO_RDFC = isNaN(parseFloat(C12_CaO_RDFC))
      ? 0.0
      : parseFloat(C12_CaO_RDFC);
    L21_p =
      I14_Lime_Saturation * 2.8 * C9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * C10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * C11_Fe2O3_RDFC -
      100 * C12_CaO_RDFC;

    setL21_p(L21_p.toFixed(2));
  };
  const compute_L22_q = () => {
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    D9_SiO2_RDFC = isNaN(parseFloat(D9_SiO2_RDFC))
      ? 0.0
      : parseFloat(D9_SiO2_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);
    D12_CaO_RDFC = isNaN(parseFloat(D12_CaO_RDFC))
      ? 0.0
      : parseFloat(D12_CaO_RDFC);
    L22_q =
      I14_Lime_Saturation * 2.8 * D9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * D10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * D11_Fe2O3_RDFC -
      100 * D12_CaO_RDFC;

    setL22_q(L22_q.toFixed(2));
  };
  const compute_L23_r = () => {
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    E9_SiO2_RDFC = isNaN(parseFloat(E9_SiO2_RDFC))
      ? 0.0
      : parseFloat(E9_SiO2_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);
    E12_CaO_RDFC = isNaN(parseFloat(E12_CaO_RDFC))
      ? 0.0
      : parseFloat(E12_CaO_RDFC);
    L23_r =
      I14_Lime_Saturation * 2.8 * E9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * E10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * E11_Fe2O3_RDFC -
      100 * E12_CaO_RDFC;

    setL23_r(L23_r.toFixed(2));
  };
  const compute_L24_s = () => {
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    F9_SiO2_RDFC = isNaN(parseFloat(F9_SiO2_RDFC))
      ? 0.0
      : parseFloat(F9_SiO2_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);
    I14_Lime_Saturation = isNaN(parseFloat(I14_Lime_Saturation))
      ? 0.0
      : parseFloat(I14_Lime_Saturation);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);
    F12_CaO_RDFC = isNaN(parseFloat(F12_CaO_RDFC))
      ? 0.0
      : parseFloat(F12_CaO_RDFC);
    L24_s =
      I14_Lime_Saturation * 2.8 * F9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * F10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * F11_Fe2O3_RDFC -
      100 * F12_CaO_RDFC;

    setL24_s(L24_s.toFixed(2));
  };

  //fixed cell
  //MATRIX DETERMINANTS

  const compute_O8_Dw_Matrix = () => {
    L12_e = isNaN(parseFloat(L12_e)) ? 0.0 : parseFloat(L12_e);
    L14_g = isNaN(parseFloat(L14_g)) ? 0.0 : parseFloat(L14_g);
    L15_h = isNaN(parseFloat(L15_h)) ? 0.0 : parseFloat(L15_h);
    L16_i = isNaN(parseFloat(L16_i)) ? 0.0 : parseFloat(L16_i);
    L19_m = isNaN(parseFloat(L19_m)) ? 0.0 : parseFloat(L19_m);
    L20_n = isNaN(parseFloat(L20_n)) ? 0.0 : parseFloat(L20_n);
    L18_l = isNaN(parseFloat(L18_l)) ? 0.0 : parseFloat(L18_l);
    L24_s = isNaN(parseFloat(L24_s)) ? 0.0 : parseFloat(L24_s);
    L22_q = isNaN(parseFloat(L22_q)) ? 0.0 : parseFloat(L22_q);
    L23_r = isNaN(parseFloat(L23_r)) ? 0.0 : parseFloat(L23_r);
    O8_Dw_Matrix =
      L12_e * L14_g * L19_m * L24_s +
      L12_e * L15_h * L20_n * L22_q +
      L12_e * L16_i * L18_l * L23_r -
      L12_e * L16_i * L19_m * L22_q -
      L12_e * L14_g * L20_n * L23_r -
      L12_e * L15_h * L18_l * L24_s;

    setO8_Dw_Matrix(O8_Dw_Matrix.toFixed(2));
  };
  const compute_O9_Dx_Matrix = () => {
    L13_f = isNaN(parseFloat(L13_f)) ? 0.0 : parseFloat(L13_f);
    L12_e = isNaN(parseFloat(L12_e)) ? 0.0 : parseFloat(L12_e);
    L17_k = isNaN(parseFloat(L17_k)) ? 0.0 : parseFloat(L17_k);
    L21_p = isNaN(parseFloat(L21_p)) ? 0.0 : parseFloat(L21_p);
    L19_m = isNaN(parseFloat(L19_m)) ? 0.0 : parseFloat(L19_m);
    L20_n = isNaN(parseFloat(L20_n)) ? 0.0 : parseFloat(L20_n);
    L15_h = isNaN(parseFloat(L15_h)) ? 0.0 : parseFloat(L15_h);
    L16_i = isNaN(parseFloat(L16_i)) ? 0.0 : parseFloat(L16_i);
    L23_r = isNaN(parseFloat(L23_r)) ? 0.0 : parseFloat(L23_r);
    L24_s = isNaN(parseFloat(L24_s)) ? 0.0 : parseFloat(L24_s);
    O9_Dx_Matrix =
      -L13_f * L12_e * L19_m * L24_s +
      L13_f * L12_e * L20_n * L23_r +
      L17_k * L12_e * L15_h * L24_s -
      L17_k * L12_e * L16_i * L23_r -
      L21_p * L12_e * L15_h * L20_n +
      L21_p * L12_e * L16_i * L19_m;

    setO9_Dx_Matrix(O9_Dx_Matrix.toFixed(2));
  };
  const compute_O10_Dy_Matrix = () => {
    L13_f = isNaN(parseFloat(L13_f)) ? 0.0 : parseFloat(L13_f);
    L12_e = isNaN(parseFloat(L12_e)) ? 0.0 : parseFloat(L12_e);
    L17_k = isNaN(parseFloat(L17_k)) ? 0.0 : parseFloat(L17_k);
    L21_p = isNaN(parseFloat(L21_p)) ? 0.0 : parseFloat(L21_p);
    L19_m = isNaN(parseFloat(L19_m)) ? 0.0 : parseFloat(L19_m);
    L20_n = isNaN(parseFloat(L20_n)) ? 0.0 : parseFloat(L20_n);
    L18_l = isNaN(parseFloat(L18_l)) ? 0.0 : parseFloat(L18_l);
    L16_i = isNaN(parseFloat(L16_i)) ? 0.0 : parseFloat(L16_i);
    L14_g = isNaN(parseFloat(L14_g)) ? 0.0 : parseFloat(L14_g);
    L22_q = isNaN(parseFloat(L22_q)) ? 0.0 : parseFloat(L22_q);
    L24_s = isNaN(parseFloat(L24_s)) ? 0.0 : parseFloat(L24_s);
    O10_Dy_Matrix =
      -L13_f * L12_e * L20_n * L22_q +
      L13_f * L12_e * L18_l * L24_s +
      L17_k * L12_e * L16_i * L22_q -
      L17_k * L12_e * L14_g * L24_s -
      L21_p * L12_e * L16_i * L18_l +
      L21_p * L12_e * L14_g * L20_n;

    setO10_Dy_Matrix(O10_Dy_Matrix.toFixed(2));
  };
  const compute_O11_Dz_Matrix = () => {
    L13_f = isNaN(parseFloat(L13_f)) ? 0.0 : parseFloat(L13_f);
    L12_e = isNaN(parseFloat(L12_e)) ? 0.0 : parseFloat(L12_e);
    L17_k = isNaN(parseFloat(L17_k)) ? 0.0 : parseFloat(L17_k);
    L21_p = isNaN(parseFloat(L21_p)) ? 0.0 : parseFloat(L21_p);
    L19_m = isNaN(parseFloat(L19_m)) ? 0.0 : parseFloat(L19_m);
    L18_l = isNaN(parseFloat(L18_l)) ? 0.0 : parseFloat(L18_l);
    L15_h = isNaN(parseFloat(L15_h)) ? 0.0 : parseFloat(L15_h);
    L14_g = isNaN(parseFloat(L14_g)) ? 0.0 : parseFloat(L14_g);
    L22_q = isNaN(parseFloat(L22_q)) ? 0.0 : parseFloat(L22_q);
    L23_r = isNaN(parseFloat(L23_r)) ? 0.0 : parseFloat(L23_r);
    O11_Dz_Matrix =
      -L13_f * L12_e * L18_l * L23_r +
      L13_f * L12_e * L19_m * L22_q +
      L17_k * L12_e * L14_g * L23_r -
      L17_k * L12_e * L15_h * L22_q -
      L21_p * L12_e * L14_g * L19_m +
      L21_p * L12_e * L15_h * L18_l;

    setO11_Dz_Matrix(O11_Dz_Matrix.toFixed(2));
  };
  const compute_O12_D_Matrix = () => {
    L13_f = isNaN(parseFloat(L13_f)) ? 0.0 : parseFloat(L13_f);
    L12_e = isNaN(parseFloat(L12_e)) ? 0.0 : parseFloat(L12_e);
    L17_k = isNaN(parseFloat(L17_k)) ? 0.0 : parseFloat(L17_k);
    L21_p = isNaN(parseFloat(L21_p)) ? 0.0 : parseFloat(L21_p);
    L19_m = isNaN(parseFloat(L19_m)) ? 0.0 : parseFloat(L19_m);
    L18_l = isNaN(parseFloat(L18_l)) ? 0.0 : parseFloat(L18_l);
    L15_h = isNaN(parseFloat(L15_h)) ? 0.0 : parseFloat(L15_h);
    L14_g = isNaN(parseFloat(L14_g)) ? 0.0 : parseFloat(L14_g);
    L22_q = isNaN(parseFloat(L22_q)) ? 0.0 : parseFloat(L22_q);
    L23_r = isNaN(parseFloat(L23_r)) ? 0.0 : parseFloat(L23_r);
    L13_f = isNaN(parseFloat(L13_f)) ? 0.0 : parseFloat(L13_f);
    L12_e = isNaN(parseFloat(L12_e)) ? 0.0 : parseFloat(L12_e);
    L17_k = isNaN(parseFloat(L17_k)) ? 0.0 : parseFloat(L17_k);
    L21_p = isNaN(parseFloat(L21_p)) ? 0.0 : parseFloat(L21_p);
    L19_m = isNaN(parseFloat(L19_m)) ? 0.0 : parseFloat(L19_m);
    L20_n = isNaN(parseFloat(L20_n)) ? 0.0 : parseFloat(L20_n);
    L18_l = isNaN(parseFloat(L18_l)) ? 0.0 : parseFloat(L18_l);
    L16_i = isNaN(parseFloat(L16_i)) ? 0.0 : parseFloat(L16_i);
    L14_g = isNaN(parseFloat(L14_g)) ? 0.0 : parseFloat(L14_g);
    L22_q = isNaN(parseFloat(L22_q)) ? 0.0 : parseFloat(L22_q);
    L24_s = isNaN(parseFloat(L24_s)) ? 0.0 : parseFloat(L24_s);
    O12_D_Matrix =
      L14_g * L19_m * L24_s +
      L15_h * L20_n * L22_q +
      L16_i * L18_l * L23_r -
      L16_i * L19_m * L22_q -
      L14_g * L20_n * L23_r -
      L15_h * L18_l * L24_s -
      L13_f * L19_m * L24_s -
      L13_f * L20_n * L22_q -
      L13_f * L18_l * L23_r +
      L13_f * L19_m * L22_q +
      L13_f * L20_n * L23_r +
      L13_f * L18_l * L24_s +
      L17_k * L15_h * L24_s +
      L17_k * L16_i * L22_q +
      L17_k * L14_g * L23_r -
      L17_k * L15_h * L22_q -
      L17_k * L16_i * L23_r -
      L17_k * L14_g * L24_s -
      L21_p * L15_h * L20_n -
      L21_p * L16_i * L18_l -
      L21_p * L14_g * L19_m +
      L21_p * L15_h * L18_l +
      L21_p * L16_i * L19_m +
      L21_p * L14_g * L20_n;

    setO12_D_Matrix(O12_D_Matrix.toFixed(2));
  };

  //RAW MATERIALS %

  const compute_O15_W = () => {
    O8_Dw_Matrix = isNaN(parseFloat(O8_Dw_Matrix))
      ? 0.0
      : parseFloat(O8_Dw_Matrix);
    O12_D_Matrix = isNaN(parseFloat(O12_D_Matrix))
      ? 0.0
      : parseFloat(O12_D_Matrix);
    O15_W = O8_Dw_Matrix / O12_D_Matrix;

    setO15_W(O15_W.toFixed(2));
  };
  const compute_O16_X = () => {
    O9_Dx_Matrix = isNaN(parseFloat(O9_Dx_Matrix))
      ? 0.0
      : parseFloat(O9_Dx_Matrix);
    O12_D_Matrix = isNaN(parseFloat(O12_D_Matrix))
      ? 0.0
      : parseFloat(O12_D_Matrix);
    O16_X = O9_Dx_Matrix / O12_D_Matrix;

    setO16_X(O16_X.toFixed(2));
  };
  const compute_O17_Y = () => {
    O10_Dy_Matrix = isNaN(parseFloat(O10_Dy_Matrix))
      ? 0.0
      : parseFloat(O10_Dy_Matrix);
    O12_D_Matrix = isNaN(parseFloat(O12_D_Matrix))
      ? 0.0
      : parseFloat(O12_D_Matrix);
    O17_Y = O10_Dy_Matrix / O12_D_Matrix;

    setO17_Y(O17_Y.toFixed(2));
  };
  const compute_O18_Z = () => {
    O11_Dz_Matrix = isNaN(parseFloat(O11_Dz_Matrix))
      ? 0.0
      : parseFloat(O11_Dz_Matrix);
    O12_D_Matrix = isNaN(parseFloat(O12_D_Matrix))
      ? 0.0
      : parseFloat(O12_D_Matrix);
    O18_Z = O11_Dz_Matrix / O12_D_Matrix;

    setO18_Z(O18_Z.toFixed(2));
  };
  const compute_O19_TOTAL = () => {
    O15_W = isNaN(parseFloat(O15_W)) ? 0.0 : parseFloat(O15_W);
    O16_X = isNaN(parseFloat(O16_X)) ? 0.0 : parseFloat(O16_X);
    O17_Y = isNaN(parseFloat(O17_Y)) ? 0.0 : parseFloat(O17_Y);
    O18_Z = isNaN(parseFloat(O18_Z)) ? 0.0 : parseFloat(O18_Z);
    O19_TOTAL = O15_W + O16_X + O17_Y + O18_Z;

    setO19_TOTAL(O19_TOTAL.toFixed(2));
  };

  const compute_C18_TOTAL_RDFC = () => {
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);
    C12_CaO_RDFC = isNaN(parseFloat(C12_CaO_RDFC))
      ? 0.0
      : parseFloat(C12_CaO_RDFC);
    C13_MgO_RDFC = isNaN(parseFloat(C13_MgO_RDFC))
      ? 0.0
      : parseFloat(C13_MgO_RDFC);
    C14_Na2O_RDFC = isNaN(parseFloat(C14_Na2O_RDFC))
      ? 0.0
      : parseFloat(C14_Na2O_RDFC);
    C15_K2O_RDFC = isNaN(parseFloat(C15_K2O_RDFC))
      ? 0.0
      : parseFloat(C15_K2O_RDFC);
    C16_SO3_RDFC = isNaN(parseFloat(C16_SO3_RDFC))
      ? 0.0
      : parseFloat(C16_SO3_RDFC);
    C17_LOI_RDFC = isNaN(parseFloat(C17_LOI_RDFC))
      ? 0.0
      : parseFloat(C17_LOI_RDFC);

    C18_TOTAL_RDFC =
      C9_SiO2_RDFC +
      C10_Al2O3_RDFC +
      C11_Fe2O3_RDFC +
      C12_CaO_RDFC +
      C13_MgO_RDFC +
      C14_Na2O_RDFC +
      C15_K2O_RDFC +
      C16_SO3_RDFC +
      C17_LOI_RDFC;

    setC18_TOTAL_RDFC(C18_TOTAL_RDFC.toFixed(2));
  };
  const compute_D18_TOTAL_RDFC = () => {
    D9_SiO2_RDFC = isNaN(parseFloat(D9_SiO2_RDFC))
      ? 0.0
      : parseFloat(D9_SiO2_RDFC);
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);
    D12_CaO_RDFC = isNaN(parseFloat(D12_CaO_RDFC))
      ? 0.0
      : parseFloat(D12_CaO_RDFC);
    D13_MgO_RDFC = isNaN(parseFloat(D13_MgO_RDFC))
      ? 0.0
      : parseFloat(D13_MgO_RDFC);
    D14_Na2O_RDFC = isNaN(parseFloat(D14_Na2O_RDFC))
      ? 0.0
      : parseFloat(D14_Na2O_RDFC);
    D15_K2O_RDFC = isNaN(parseFloat(D15_K2O_RDFC))
      ? 0.0
      : parseFloat(D15_K2O_RDFC);
    D16_SO3_RDFC = isNaN(parseFloat(D16_SO3_RDFC))
      ? 0.0
      : parseFloat(D16_SO3_RDFC);
    D17_LOI_RDFC = isNaN(parseFloat(D17_LOI_RDFC))
      ? 0.0
      : parseFloat(D17_LOI_RDFC);

    D18_TOTAL_RDFC =
      D9_SiO2_RDFC +
      D10_Al2O3_RDFC +
      D11_Fe2O3_RDFC +
      D12_CaO_RDFC +
      D13_MgO_RDFC +
      D14_Na2O_RDFC +
      D15_K2O_RDFC +
      D16_SO3_RDFC +
      D17_LOI_RDFC;
    setD18_TOTAL_RDFC(D18_TOTAL_RDFC.toFixed(2));
  };
  const compute_E18_TOTAL_RDFC = () => {
    E9_SiO2_RDFC = isNaN(parseFloat(E9_SiO2_RDFC))
      ? 0.0
      : parseFloat(E9_SiO2_RDFC);
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);
    E12_CaO_RDFC = isNaN(parseFloat(E12_CaO_RDFC))
      ? 0.0
      : parseFloat(E12_CaO_RDFC);
    E13_MgO_RDFC = isNaN(parseFloat(E13_MgO_RDFC))
      ? 0.0
      : parseFloat(E13_MgO_RDFC);
    E14_Na2O_RDFC = isNaN(parseFloat(E14_Na2O_RDFC))
      ? 0.0
      : parseFloat(E14_Na2O_RDFC);
    E15_K2O_RDFC = isNaN(parseFloat(E15_K2O_RDFC))
      ? 0.0
      : parseFloat(E15_K2O_RDFC);
    E16_SO3_RDFC = isNaN(parseFloat(E16_SO3_RDFC))
      ? 0.0
      : parseFloat(E16_SO3_RDFC);
    E17_LOI_RDFC = isNaN(parseFloat(E17_LOI_RDFC))
      ? 0.0
      : parseFloat(E17_LOI_RDFC);

    E18_TOTAL_RDFC =
      E9_SiO2_RDFC +
      E10_Al2O3_RDFC +
      E11_Fe2O3_RDFC +
      E12_CaO_RDFC +
      E13_MgO_RDFC +
      E14_Na2O_RDFC +
      E15_K2O_RDFC +
      E16_SO3_RDFC +
      E17_LOI_RDFC;

    setE18_TOTAL_RDFC(E18_TOTAL_RDFC.toFixed(2));
  };
  const compute_F18_TOTAL_RDFC = () => {
    F9_SiO2_RDFC = isNaN(parseFloat(F9_SiO2_RDFC))
      ? 0.0
      : parseFloat(F9_SiO2_RDFC);
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);
    F12_CaO_RDFC = isNaN(parseFloat(F12_CaO_RDFC))
      ? 0.0
      : parseFloat(F12_CaO_RDFC);
    F13_MgO_RDFC = isNaN(parseFloat(F13_MgO_RDFC))
      ? 0.0
      : parseFloat(F13_MgO_RDFC);
    F14_Na2O_RDFC = isNaN(parseFloat(F14_Na2O_RDFC))
      ? 0.0
      : parseFloat(F14_Na2O_RDFC);
    F15_K2O_RDFC = isNaN(parseFloat(F15_K2O_RDFC))
      ? 0.0
      : parseFloat(F15_K2O_RDFC);
    F16_SO3_RDFC = isNaN(parseFloat(F16_SO3_RDFC))
      ? 0.0
      : parseFloat(F16_SO3_RDFC);
    F17_LOI_RDFC = isNaN(parseFloat(F17_LOI_RDFC))
      ? 0.0
      : parseFloat(F17_LOI_RDFC);

    F18_TOTAL_RDFC =
      F9_SiO2_RDFC +
      F10_Al2O3_RDFC +
      F11_Fe2O3_RDFC +
      F12_CaO_RDFC +
      F13_MgO_RDFC +
      F14_Na2O_RDFC +
      F15_K2O_RDFC +
      F16_SO3_RDFC +
      F17_LOI_RDFC;
    setF18_TOTAL_RDFC(F18_TOTAL_RDFC.toFixed(2));
  };
  //LSF
  const compute_C19_LSF_RDFC = () => {
    C12_CaO_RDFC = isNaN(parseFloat(C12_CaO_RDFC))
      ? 0.0
      : parseFloat(C12_CaO_RDFC);
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);

    C19_LSF_RDFC =
      (100 * C12_CaO_RDFC) /
      (2.8 * C9_SiO2_RDFC + 1.18 * C10_Al2O3_RDFC + 0.65 * C11_Fe2O3_RDFC);

    setC19_LSF_RDFC(C19_LSF_RDFC.toFixed(2));
  };

  const compute_D19_LSF_RDFC = () => {
    D9_SiO2_RDFC = isNaN(parseFloat(D9_SiO2_RDFC))
      ? 0.0
      : parseFloat(D9_SiO2_RDFC);
    D12_CaO_RDFC = isNaN(parseFloat(D12_CaO_RDFC))
      ? 0.0
      : parseFloat(D12_CaO_RDFC);
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);

    D19_LSF_RDFC =
      (100 * D12_CaO_RDFC) /
      (2.8 * D9_SiO2_RDFC + 1.18 * D10_Al2O3_RDFC + 0.65 * D11_Fe2O3_RDFC);

    setD19_LSF_RDFC(D19_LSF_RDFC.toFixed(2));
  };
  const compute_E19_LSF_RDFC = () => {
    E9_SiO2_RDFC = isNaN(parseFloat(E9_SiO2_RDFC))
      ? 0.0
      : parseFloat(E9_SiO2_RDFC);
    E12_CaO_RDFC = isNaN(parseFloat(E12_CaO_RDFC))
      ? 0.0
      : parseFloat(E12_CaO_RDFC);
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);

    E19_LSF_RDFC =
      (100 * E12_CaO_RDFC) /
      (2.8 * E9_SiO2_RDFC + 1.18 * E10_Al2O3_RDFC + 0.65 * E11_Fe2O3_RDFC);

    setE19_LSF_RDFC(E19_LSF_RDFC.toFixed(2));
  };
  const compute_F19_LSF_RDFC = () => {
    F9_SiO2_RDFC = isNaN(parseFloat(F9_SiO2_RDFC))
      ? 0.0
      : parseFloat(F9_SiO2_RDFC);
    F12_CaO_RDFC = isNaN(parseFloat(F12_CaO_RDFC))
      ? 0.0
      : parseFloat(F12_CaO_RDFC);
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);

    F19_LSF_RDFC =
      (100 * F12_CaO_RDFC) /
      (2.8 * F9_SiO2_RDFC + 1.18 * F10_Al2O3_RDFC + 0.65 * F11_Fe2O3_RDFC);

    setF19_LSF_RDFC(F19_LSF_RDFC.toFixed(2));
  };

  //SM
  const compute_C20_SM_RDFC = () => {
    C9_SiO2_RDFC = isNaN(parseFloat(C9_SiO2_RDFC))
      ? 0.0
      : parseFloat(C9_SiO2_RDFC);
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);

    C20_SM_RDFC = C9_SiO2_RDFC / (C10_Al2O3_RDFC + C11_Fe2O3_RDFC);

    setC20_SM_RDFC(C20_SM_RDFC.toFixed(2));
  };
  const compute_D20_SM_RDFC = () => {
    D9_SiO2_RDFC = isNaN(parseFloat(D9_SiO2_RDFC))
      ? 0.0
      : parseFloat(D9_SiO2_RDFC);
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);

    D20_SM_RDFC = D9_SiO2_RDFC / (D10_Al2O3_RDFC + D11_Fe2O3_RDFC);

    setD20_SM_RDFC(D20_SM_RDFC.toFixed(2));
  };
  const compute_E20_SM_RDFC = () => {
    E9_SiO2_RDFC = isNaN(parseFloat(E9_SiO2_RDFC))
      ? 0.0
      : parseFloat(E9_SiO2_RDFC);
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);

    E20_SM_RDFC = D9_SiO2_RDFC / (D10_Al2O3_RDFC + D11_Fe2O3_RDFC);

    setE20_SM_RDFC(E20_SM_RDFC.toFixed(2));
  };
  const compute_F20_SM_RDFC = () => {
    F9_SiO2_RDFC = isNaN(parseFloat(F9_SiO2_RDFC))
      ? 0.0
      : parseFloat(F9_SiO2_RDFC);
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);

    F20_SM_RDFC = F9_SiO2_RDFC / (F10_Al2O3_RDFC + F11_Fe2O3_RDFC);

    setF20_SM_RDFC(F20_SM_RDFC.toFixed(2));
  };
  //AM

  const compute_C21_AM_RDFC = () => {
    C10_Al2O3_RDFC = isNaN(parseFloat(C10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(C10_Al2O3_RDFC);
    C11_Fe2O3_RDFC = isNaN(parseFloat(C11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(C11_Fe2O3_RDFC);

    C21_AM_RDFC = C10_Al2O3_RDFC / C11_Fe2O3_RDFC;

    setC21_AM_RDFC(C21_AM_RDFC.toFixed(2));
  };
  const compute_D21_AM_RDFC = () => {
    D10_Al2O3_RDFC = isNaN(parseFloat(D10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(D10_Al2O3_RDFC);
    D11_Fe2O3_RDFC = isNaN(parseFloat(D11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(D11_Fe2O3_RDFC);

    D21_AM_RDFC = D10_Al2O3_RDFC / D11_Fe2O3_RDFC;

    setD21_AM_RDFC(D21_AM_RDFC.toFixed(2));
  };
  const compute_E21_AM_RDFC = () => {
    E10_Al2O3_RDFC = isNaN(parseFloat(E10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(E10_Al2O3_RDFC);
    E11_Fe2O3_RDFC = isNaN(parseFloat(E11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(E11_Fe2O3_RDFC);

    E21_AM_RDFC = E10_Al2O3_RDFC / E11_Fe2O3_RDFC;

    setE21_AM_RDFC(E21_AM_RDFC.toFixed(2));
  };
  const compute_F21_AM_RDFC = () => {
    F10_Al2O3_RDFC = isNaN(parseFloat(F10_Al2O3_RDFC))
      ? 0.0
      : parseFloat(F10_Al2O3_RDFC);
    F11_Fe2O3_RDFC = isNaN(parseFloat(F11_Fe2O3_RDFC))
      ? 0.0
      : parseFloat(F11_Fe2O3_RDFC);

    F21_AM_RDFC = F10_Al2O3_RDFC / F11_Fe2O3_RDFC;

    setF21_AM_RDFC(F21_AM_RDFC.toFixed(2));
  };

  function emptyinput2() {
    C8_MIX_RDFC <= 0 ? setC8_MIX_RDFC("") : C8_MIX_RDFC;
    C9_SiO2_RDFC <= 0 ? setC9_SiO2_RDFC("") : C9_SiO2_RDFC;
    C10_Al2O3_RDFC <= 0 ? setC10_Al2O3_RDFC("") : C10_Al2O3_RDFC;
    C11_Fe2O3_RDFC <= 0 ? setC11_Fe2O3_RDFC("") : C11_Fe2O3_RDFC;
    C12_CaO_RDFC <= 0 ? setC12_CaO_RDFC("") : C12_CaO_RDFC;
    C13_MgO_RDFC <= 0 ? setC13_MgO_RDFC("") : C13_MgO_RDFC;
    C14_Na2O_RDFC <= 0 ? setC14_Na2O_RDFC("") : C14_Na2O_RDFC;
    C15_K2O_RDFC <= 0 ? setC15_K2O_RDFC("") : C15_K2O_RDFC;
    C16_SO3_RDFC <= 0 ? setC16_SO3_RDFC("") : C16_SO3_RDFC;
    C17_LOI_RDFC <= 0 ? setC17_LOI_RDFC("") : C17_LOI_RDFC;
    D8_MIX_RDFC <= 0 ? setD8_MIX_RDFC("") : D8_MIX_RDFC;
    D9_SiO2_RDFC <= 0 ? setD9_SiO2_RDFC("") : D9_SiO2_RDFC;
    D10_Al2O3_RDFC <= 0 ? setD10_Al2O3_RDFC("") : D10_Al2O3_RDFC;
    D11_Fe2O3_RDFC <= 0 ? setD11_Fe2O3_RDFC("") : D11_Fe2O3_RDFC;
    D12_CaO_RDFC <= 0 ? setD12_CaO_RDFC("") : D12_CaO_RDFC;
    D13_MgO_RDFC <= 0 ? setD13_MgO_RDFC("") : D13_MgO_RDFC;
    D14_Na2O_RDFC <= 0 ? setD14_Na2O_RDFC("") : D14_Na2O_RDFC;
    D15_K2O_RDFC <= 0 ? setD15_K2O_RDFC("") : D15_K2O_RDFC;
    D16_SO3_RDFC <= 0 ? setD16_SO3_RDFC("") : D16_SO3_RDFC;
    D17_LOI_RDFC <= 0 ? setD17_LOI_RDFC("") : D17_LOI_RDFC;
    E8_MIX_RDFC <= 0 ? setE8_MIX_RDFC("") : E8_MIX_RDFC;
    E9_SiO2_RDFC <= 0 ? setE9_SiO2_RDFC("") : E9_SiO2_RDFC;
    E10_Al2O3_RDFC <= 0 ? setE10_Al2O3_RDFC("") : E10_Al2O3_RDFC;
    E11_Fe2O3_RDFC <= 0 ? setE11_Fe2O3_RDFC("") : E11_Fe2O3_RDFC;
    E12_CaO_RDFC <= 0 ? setE12_CaO_RDFC("") : E12_CaO_RDFC;
    E13_MgO_RDFC <= 0 ? setE13_MgO_RDFC("") : E13_MgO_RDFC;
    E14_Na2O_RDFC <= 0 ? setE14_Na2O_RDFC("") : E14_Na2O_RDFC;
    E15_K2O_RDFC <= 0 ? setE15_K2O_RDFC("") : E15_K2O_RDFC;
    E16_SO3_RDFC <= 0 ? setE16_SO3_RDFC("") : E16_SO3_RDFC;
    E17_LOI_RDFC <= 0 ? setE17_LOI_RDFC("") : E17_LOI_RDFC;
    F8_MIX_RDFC <= 0 ? setF8_MIX_RDFC("") : F8_MIX_RDFC;
    F9_SiO2_RDFC <= 0 ? setF9_SiO2_RDFC("") : F9_SiO2_RDFC;
    F10_Al2O3_RDFC <= 0 ? setF10_Al2O3_RDFC("") : F10_Al2O3_RDFC;
    F11_Fe2O3_RDFC <= 0 ? setF11_Fe2O3_RDFC("") : F11_Fe2O3_RDFC;
    F12_CaO_RDFC <= 0 ? setF12_CaO_RDFC("") : F12_CaO_RDFC;
    F13_MgO_RDFC <= 0 ? setF13_MgO_RDFC("") : F13_MgO_RDFC;
    F14_Na2O_RDFC <= 0 ? setF14_Na2O_RDFC("") : F14_Na2O_RDFC;
    F15_K2O_RDFC <= 0 ? setF15_K2O_RDFC("") : F15_K2O_RDFC;
    F16_SO3_RDFC <= 0 ? setF16_SO3_RDFC("") : F16_SO3_RDFC;
    F17_LOI_RDFC <= 0 ? setF17_LOI_RDFC("") : F17_LOI_RDFC;
    I14_Lime_Saturation <= 0 ? setI14_Lime_Saturation("") : I14_Lime_Saturation;
    I17_Silica_Modulus <= 0 ? setI17_Silica_Modulus("") : I17_Silica_Modulus;
    I20_Alumina_Modulus <= 0 ? setI20_Alumina_Modulus("") : I20_Alumina_Modulus;
  }

  function clearall2() {
    setC8_MIX_RDFC(0.0);
    setC9_SiO2_RDFC(0.0);
    setC10_Al2O3_RDFC(0.0);
    setC11_Fe2O3_RDFC(0.0);
    setC12_CaO_RDFC(0.0);
    setC13_MgO_RDFC(0.0);
    setC14_Na2O_RDFC(0.0);
    setC15_K2O_RDFC(0.0);
    setC16_SO3_RDFC(0.0);
    setC17_LOI_RDFC(0.0);
    setC18_TOTAL_RDFC(0.0);
    setC19_LSF_RDFC(0.0);
    setC20_SM_RDFC(0.0);
    setC21_AM_RDFC(0.0);
    setD8_MIX_RDFC(0.0);
    setD9_SiO2_RDFC(0.0);
    setD10_Al2O3_RDFC(0.0);
    setD11_Fe2O3_RDFC(0.0);
    setD12_CaO_RDFC(0.0);
    setD13_MgO_RDFC(0.0);
    setD14_Na2O_RDFC(0.0);
    setD15_K2O_RDFC(0.0);
    setD16_SO3_RDFC(0.0);
    setD17_LOI_RDFC(0.0);
    setD18_TOTAL_RDFC(0.0);
    setD19_LSF_RDFC(0.0);
    setD20_SM_RDFC(0.0);
    setD21_AM_RDFC(0.0);
    setE8_MIX_RDFC(0.0);
    setE9_SiO2_RDFC(0.0);
    setE10_Al2O3_RDFC(0.0);
    setE11_Fe2O3_RDFC(0.0);
    setE12_CaO_RDFC(0.0);
    setE13_MgO_RDFC(0.0);
    setE14_Na2O_RDFC(0.0);
    setE15_K2O_RDFC(0.0);
    setE16_SO3_RDFC(0.0);
    setE17_LOI_RDFC(0.0);
    setE18_TOTAL_RDFC(0.0);
    setE19_LSF_RDFC(0.0);
    setE20_SM_RDFC(0.0);
    setE21_AM_RDFC(0.0);
    setF8_MIX_RDFC(0.0);
    setF9_SiO2_RDFC(0.0);
    setF10_Al2O3_RDFC(0.0);
    setF11_Fe2O3_RDFC(0.0);
    setF12_CaO_RDFC(0.0);
    setF13_MgO_RDFC(0.0);
    setF14_Na2O_RDFC(0.0);
    setF15_K2O_RDFC(0.0);
    setF16_SO3_RDFC(0.0);
    setF17_LOI_RDFC(0.0);
    setF18_TOTAL_RDFC(0.0);
    setF19_LSF_RDFC(0.0);
    setF20_SM_RDFC(0.0);
    setF21_AM_RDFC(0.0);
    setG8_MIX_RDFC(0.0);
    setG9_SiO2_RDFC(0.0);
    setG10_Al2O3_RDFC(0.0);
    setG11_Fe2O3_RDFC(0.0);
    setG12_CaO_RDFC(0.0);
    setG13_MgO_RDFC(0.0);
    setG14_Na2O_RDFC(0.0);
    setG15_K2O_RDFC(0.0);
    setG16_SO3_RDFC(0.0);
    setG17_LOI_RDFC(0.0);
    setG18_TOTAL_RDFC(0.0);
    setG19_LSF_RDFC(0.0);
    setG20_SM_RDFC(0.0);
    setG21_AM_RDFC(0.0);
    setI14_Lime_Saturation(0.0);
    setI17_Silica_Modulus(0.0);
    setI20_Alumina_Modulus(0.0);
    setL8_a(0.0);
    setL9_b(0.0);
    setL10_c(0.0);
    setL11_d(0.0);
    setL12_e(0.0);
    setL13_f(0.0);
    setL14_g(0.0);
    setL15_h(0.0);
    setL16_i(0.0);
    setL17_k(0.0);
    setL18_l(0.0);
    setL19_m(0.0);
    setL20_n(0.0);
    setL21_p(0.0);
    setL22_q(0.0);
    setL23_r(0.0);
    setL24_s(0.0);
    setO8_Dw_Matrix(0.0);
    setO9_Dx_Matrix(0.0);
    setO10_Dy_Matrix(0.0);
    setO11_Dz_Matrix(0.0);
    setO12_D_Matrix(0.0);
    setO15_W(0.0);
    setO16_X(0.0);
    setO17_Y(0.0);
    setO18_Z(0.0);
    setO19_TOTAL(0.0);
  }

  function loadall2() {
    compute_G8_MIX_RDFC();
    compute_G9_SiO2_RDFC();
    compute_G11_Fe2O3_RDFC();
    compute_G12_CaO_RDFC();
    compute_G13_MgO_RDFC();
    compute_G14_Na2O_RDFC();
    compute_G15_K2O_RDFC();
    compute_G16_SO3_RDFC();
    compute_G17_LOI_RDFC();
    compute_G18_TOTAL_RDFC();
    compute_G19_LSF_RDFC();
    compute_G20_SM_RDFC();
    compute_G21_AM_RDFC();
    compute_L8_a_L12_e();
    compute_L13_f();
    compute_L14_g();
    compute_L15_h();
    compute_L16_i();
    compute_L17_k();
    compute_L18_l();
    compute_L19_m();
    compute_L20_n();
    compute_L21_p();
    compute_L22_q();
    compute_L23_r();
    compute_L24_s();
    compute_O8_Dw_Matrix();
    compute_O9_Dx_Matrix();
    compute_O10_Dy_Matrix();
    compute_O11_Dz_Matrix();
    compute_O12_D_Matrix();
    compute_O15_W();
    compute_O16_X();
    compute_O17_Y();
    compute_O18_Z();
    compute_O19_TOTAL();

    compute_C18_TOTAL_RDFC();
    compute_D18_TOTAL_RDFC();
    compute_E18_TOTAL_RDFC();
    compute_F18_TOTAL_RDFC();

    compute_C19_LSF_RDFC();
    compute_D19_LSF_RDFC();
    compute_E19_LSF_RDFC();
    compute_F19_LSF_RDFC();

    compute_C20_SM_RDFC();
    compute_D20_SM_RDFC();
    compute_E20_SM_RDFC();
    compute_F20_SM_RDFC();

    compute_C21_AM_RDFC();
    compute_D21_AM_RDFC();
    compute_E21_AM_RDFC();
    compute_F21_AM_RDFC();

    checkNan();
  }

  function checkNan() {
    result_total_C15 = isNaN(parseFloat(result_total_C15))
      ? 0.0
      : parseFloat(result_total_C15);
    resulttotal_C16 = isNaN(parseFloat(resulttotal_C16))
      ? 0.0
      : parseFloat(resulttotal_C16);
    resulttotal_C17 = isNaN(parseFloat(resulttotal_C17))
      ? 0.0
      : parseFloat(resulttotal_C17);
    resulttotal_C18 = isNaN(parseFloat(resulttotal_C18))
      ? 0.0
      : parseFloat(resulttotal_C18);
    resulttotal_C19 = isNaN(parseFloat(resulttotal_C19))
      ? 0.0
      : parseFloat(resulttotal_C19);
    D15 = isNaN(parseFloat(D15)) ? 0.0 : parseFloat(D15);
    E15 = isNaN(parseFloat(E15)) ? 0.0 : parseFloat(E15);
    F15 = isNaN(parseFloat(F15)) ? 0.0 : parseFloat(F15);
    G15 = isNaN(parseFloat(G15)) ? 0.0 : parseFloat(G15);
    H15_SiO2 = isNaN(parseFloat(H15_SiO2)) ? 0.0 : parseFloat(H15_SiO2);
    H16_SiO2 = isNaN(parseFloat(H16_SiO2)) ? 0.0 : parseFloat(H16_SiO2);
    H17_SiO2 = isNaN(parseFloat(H17_SiO2)) ? 0.0 : parseFloat(H17_SiO2);
    H18_SiO2 = isNaN(parseFloat(H18_SiO2)) ? 0.0 : parseFloat(H18_SiO2);
    I15_Al2O3 = isNaN(parseFloat(I15_Al2O3)) ? 0.0 : parseFloat(I15_Al2O3);
    I16_Al2O3 = isNaN(parseFloat(I16_Al2O3)) ? 0.0 : parseFloat(I16_Al2O3);
    I17_Al2O3 = isNaN(parseFloat(I17_Al2O3)) ? 0.0 : parseFloat(I17_Al2O3);
    I18_Al2O3 = isNaN(parseFloat(I18_Al2O3)) ? 0.0 : parseFloat(I18_Al2O3);
    J15_Fe2O3 = isNaN(parseFloat(J15_Fe2O3)) ? 0.0 : parseFloat(J15_Fe2O3);
    J16_Fe2O3 = isNaN(parseFloat(J16_Fe2O3)) ? 0.0 : parseFloat(J16_Fe2O3);
    J17_Fe2O3 = isNaN(parseFloat(J17_Fe2O3)) ? 0.0 : parseFloat(J17_Fe2O3);
    J18_Fe2O3 = isNaN(parseFloat(J18_Fe2O3)) ? 0.0 : parseFloat(J18_Fe2O3);
    K15_CaO = isNaN(parseFloat(K15_CaO)) ? 0.0 : parseFloat(K15_CaO);
    K16_CaO = isNaN(parseFloat(K16_CaO)) ? 0.0 : parseFloat(K16_CaO);
    K17_CaO = isNaN(parseFloat(K17_CaO)) ? 0.0 : parseFloat(K17_CaO);
    K18_CaO = isNaN(parseFloat(K18_CaO)) ? 0.0 : parseFloat(K18_CaO);
    L15_MgO = isNaN(parseFloat(L15_MgO)) ? 0.0 : parseFloat(L15_MgO);
    L16_MgO = isNaN(parseFloat(L16_MgO)) ? 0.0 : parseFloat(L16_MgO);
    L17_MgO = isNaN(parseFloat(L17_MgO)) ? 0.0 : parseFloat(L17_MgO);
    L18_MgO = isNaN(parseFloat(L18_MgO)) ? 0.0 : parseFloat(L18_MgO);
    M15_Na2O = isNaN(parseFloat(M15_Na2O)) ? 0.0 : parseFloat(M15_Na2O);
    M16_Na2O = isNaN(parseFloat(M16_Na2O)) ? 0.0 : parseFloat(M16_Na2O);
    M17_Na2O = isNaN(parseFloat(M17_Na2O)) ? 0.0 : parseFloat(M17_Na2O);
    M18_Na2O = isNaN(parseFloat(M18_Na2O)) ? 0.0 : parseFloat(M18_Na2O);
    N15_K2O = isNaN(parseFloat(N15_K2O)) ? 0.0 : parseFloat(N15_K2O);
    N16_K2O = isNaN(parseFloat(N16_K2O)) ? 0.0 : parseFloat(N16_K2O);
    N17_K2O = isNaN(parseFloat(N17_K2O)) ? 0.0 : parseFloat(N17_K2O);
    N18_K2O = isNaN(parseFloat(N18_K2O)) ? 0.0 : parseFloat(N18_K2O);
    O15_SO3 = isNaN(parseFloat(O15_SO3)) ? 0.0 : parseFloat(O15_SO3);
    O16_SO3 = isNaN(parseFloat(O16_SO3)) ? 0.0 : parseFloat(O16_SO3);
    O17_SO3 = isNaN(parseFloat(O17_SO3)) ? 0.0 : parseFloat(O17_SO3);
    O18_SO3 = isNaN(parseFloat(O18_SO3)) ? 0.0 : parseFloat(O18_SO3);
    P15_Cl = isNaN(parseFloat(P15_Cl)) ? 0.0 : parseFloat(P15_Cl);
    P16_Cl = isNaN(parseFloat(P16_Cl)) ? 0.0 : parseFloat(P16_Cl);
    P17_Cl = isNaN(parseFloat(P17_Cl)) ? 0.0 : parseFloat(P17_Cl);
    P18_Cl = isNaN(parseFloat(P18_Cl)) ? 0.0 : parseFloat(P18_Cl);
    Q15_LOI = isNaN(parseFloat(Q15_LOI)) ? 0.0 : parseFloat(Q15_LOI);
    Q16_LOI = isNaN(parseFloat(Q16_LOI)) ? 0.0 : parseFloat(Q16_LOI);
    Q17_LOI = isNaN(parseFloat(Q17_LOI)) ? 0.0 : parseFloat(Q17_LOI);
    Q18_LOI = isNaN(parseFloat(Q18_LOI)) ? 0.0 : parseFloat(Q18_LOI);
    R15_XRFtotal = isNaN(parseFloat(R15_XRFtotal))
      ? 0.0
      : parseFloat(R15_XRFtotal);
    R16_XRFtotal = isNaN(parseFloat(R16_XRFtotal))
      ? 0.0
      : parseFloat(R16_XRFtotal);
    R17_XRFtotal = isNaN(parseFloat(R17_XRFtotal))
      ? 0.0
      : parseFloat(R17_XRFtotal);
    R18_XRFtotal = isNaN(parseFloat(R18_XRFtotal))
      ? 0.0
      : parseFloat(R18_XRFtotal);
    S15_LSF = isNaN(parseFloat(S15_LSF)) ? 0.0 : parseFloat(S15_LSF);
    S16_LSF = isNaN(parseFloat(S16_LSF)) ? 0.0 : parseFloat(S16_LSF);
    S17_LSF = isNaN(parseFloat(S17_LSF)) ? 0.0 : parseFloat(S17_LSF);
    S18_LSF = isNaN(parseFloat(S18_LSF)) ? 0.0 : parseFloat(S18_LSF);
    T15_HM = isNaN(parseFloat(T15_HM)) ? 0.0 : parseFloat(T15_HM);
    T16_HM = isNaN(parseFloat(T16_HM)) ? 0.0 : parseFloat(T16_HM);
    T17_HM = isNaN(parseFloat(T17_HM)) ? 0.0 : parseFloat(T17_HM);
    T18_HM = isNaN(parseFloat(T18_HM)) ? 0.0 : parseFloat(T18_HM);
    U15_SM = isNaN(parseFloat(U15_SM)) ? 0.0 : parseFloat(U15_SM);
    U16_SM = isNaN(parseFloat(U16_SM)) ? 0.0 : parseFloat(U16_SM);
    U17_SM = isNaN(parseFloat(U17_SM)) ? 0.0 : parseFloat(U17_SM);
    U18_SM = isNaN(parseFloat(U18_SM)) ? 0.0 : parseFloat(U18_SM);
    V15_AM = isNaN(parseFloat(V15_AM)) ? 0.0 : parseFloat(V15_AM);
    V16_AM = isNaN(parseFloat(V16_AM)) ? 0.0 : parseFloat(V16_AM);
    V17_AM = isNaN(parseFloat(V17_AM)) ? 0.0 : parseFloat(V17_AM);
    V18_AM = isNaN(parseFloat(V18_AM)) ? 0.0 : parseFloat(V18_AM);
    D19_Limestome = isNaN(parseFloat(D19_Limestome))
      ? 0.0
      : parseFloat(D19_Limestome);
    E19_Shale = isNaN(parseFloat(E19_Shale)) ? 0.0 : parseFloat(E19_Shale);
    F19_Sand = isNaN(parseFloat(F19_Sand)) ? 0.0 : parseFloat(F19_Sand);
    G19_Iron = isNaN(parseFloat(G19_Iron)) ? 0.0 : parseFloat(G19_Iron);
    D16_Limestome = isNaN(parseFloat(D16_Limestome))
      ? 0.0
      : parseFloat(D16_Limestome);
    D17_Limestome = isNaN(parseFloat(D17_Limestome))
      ? 0.0
      : parseFloat(D17_Limestome);
    D18_Limestome = isNaN(parseFloat(D18_Limestome))
      ? 0.0
      : parseFloat(D18_Limestome);
    E16_Shale = isNaN(parseFloat(E16_Shale)) ? 0.0 : parseFloat(E16_Shale);
    E17_Shale = isNaN(parseFloat(E17_Shale)) ? 0.0 : parseFloat(E17_Shale);
    E18_Shale = isNaN(parseFloat(E18_Shale)) ? 0.0 : parseFloat(E18_Shale);
    F16_Sand = isNaN(parseFloat(F16_Sand)) ? 0.0 : parseFloat(F16_Sand);
    F17_Sand = isNaN(parseFloat(F17_Sand)) ? 0.0 : parseFloat(F17_Sand);
    F18_Sand = isNaN(parseFloat(F18_Sand)) ? 0.0 : parseFloat(F18_Sand);
    G16_Iron = isNaN(parseFloat(G16_Iron)) ? 0.0 : parseFloat(G16_Iron);
    G17_Iron = isNaN(parseFloat(G17_Iron)) ? 0.0 : parseFloat(G17_Iron);
    G18_Iron = isNaN(parseFloat(G18_Iron)) ? 0.0 : parseFloat(G18_Iron);
    D20_AVG = isNaN(parseFloat(D20_AVG)) ? 0.0 : parseFloat(D20_AVG);
    E20_AVG = isNaN(parseFloat(E20_AVG)) ? 0.0 : parseFloat(E20_AVG);
    F20_AVG = isNaN(parseFloat(F20_AVG)) ? 0.0 : parseFloat(F20_AVG);
    G20_AVG = isNaN(parseFloat(G20_AVG)) ? 0.0 : parseFloat(G20_AVG);
    H20_AVG = isNaN(parseFloat(H20_AVG)) ? 0.0 : parseFloat(H20_AVG);
    I20_AVG = isNaN(parseFloat(I20_AVG)) ? 0.0 : parseFloat(I20_AVG);
    J20_AVG = isNaN(parseFloat(J20_AVG)) ? 0.0 : parseFloat(J20_AVG);
    K20_AVG = isNaN(parseFloat(K20_AVG)) ? 0.0 : parseFloat(K20_AVG);
    L20_AVG = isNaN(parseFloat(L20_AVG)) ? 0.0 : parseFloat(L20_AVG);
    M20_AVG = isNaN(parseFloat(M20_AVG)) ? 0.0 : parseFloat(M20_AVG);
    N20_AVG = isNaN(parseFloat(N20_AVG)) ? 0.0 : parseFloat(N20_AVG);
    O20_AVG = isNaN(parseFloat(O20_AVG)) ? 0.0 : parseFloat(O20_AVG);
    P20_AVG = isNaN(parseFloat(P20_AVG)) ? 0.0 : parseFloat(P20_AVG);
    Q20_AVG = isNaN(parseFloat(Q20_AVG)) ? 0.0 : parseFloat(Q20_AVG);
    R20_AVG = isNaN(parseFloat(R20_AVG)) ? 0.0 : parseFloat(R20_AVG);
    S20_AVG = isNaN(parseFloat(S20_AVG)) ? 0.0 : parseFloat(S20_AVG);
    T20_AVG = isNaN(parseFloat(T20_AVG)) ? 0.0 : parseFloat(T20_AVG);
    U20_AVG = isNaN(parseFloat(U20_AVG)) ? 0.0 : parseFloat(U20_AVG);
    V20_AVG = isNaN(parseFloat(V20_AVG)) ? 0.0 : parseFloat(V20_AVG);
    D20_STDEV = isNaN(parseFloat(D20_STDEV)) ? 0.0 : parseFloat(D20_STDEV);
    E20_STDEV = isNaN(parseFloat(E20_STDEV)) ? 0.0 : parseFloat(E20_STDEV);
    F20_STDEV = isNaN(parseFloat(F20_STDEV)) ? 0.0 : parseFloat(F20_STDEV);
    G20_STDEV = isNaN(parseFloat(G20_STDEV)) ? 0.0 : parseFloat(G20_STDEV);
    H20_STDEV = isNaN(parseFloat(H20_STDEV)) ? 0.0 : parseFloat(H20_STDEV);
    I20_STDEV = isNaN(parseFloat(I20_STDEV)) ? 0.0 : parseFloat(I20_STDEV);
    J20_STDEV = isNaN(parseFloat(J20_STDEV)) ? 0.0 : parseFloat(J20_STDEV);
    K20_STDEV = isNaN(parseFloat(K20_STDEV)) ? 0.0 : parseFloat(K20_STDEV);
    L20_STDEV = isNaN(parseFloat(L20_STDEV)) ? 0.0 : parseFloat(L20_STDEV);
    M20_STDEV = isNaN(parseFloat(M20_STDEV)) ? 0.0 : parseFloat(M20_STDEV);
    N20_STDEV = isNaN(parseFloat(N20_STDEV)) ? 0.0 : parseFloat(N20_STDEV);
    O20_STDEV = isNaN(parseFloat(O20_STDEV)) ? 0.0 : parseFloat(O20_STDEV);
    P20_STDEV = isNaN(parseFloat(P20_STDEV)) ? 0.0 : parseFloat(P20_STDEV);
    Q20_STDEV = isNaN(parseFloat(Q20_STDEV)) ? 0.0 : parseFloat(Q20_STDEV);
    R20_STDEV = isNaN(parseFloat(R20_STDEV)) ? 0.0 : parseFloat(R20_STDEV);
    S20_STDEV = isNaN(parseFloat(S20_STDEV)) ? 0.0 : parseFloat(S20_STDEV);
    T20_STDEV = isNaN(parseFloat(T20_STDEV)) ? 0.0 : parseFloat(T20_STDEV);
    U20_STDEV = isNaN(parseFloat(U20_STDEV)) ? 0.0 : parseFloat(U20_STDEV);
    V20_STDEV = isNaN(parseFloat(V20_STDEV)) ? 0.0 : parseFloat(V20_STDEV);
    D20_MIN = isNaN(parseFloat(D20_MIN)) ? 0.0 : parseFloat(D20_MIN);
    E20_MIN = isNaN(parseFloat(E20_MIN)) ? 0.0 : parseFloat(E20_MIN);
    F20_MIN = isNaN(parseFloat(F20_MIN)) ? 0.0 : parseFloat(F20_MIN);
    G20_MIN = isNaN(parseFloat(G20_MIN)) ? 0.0 : parseFloat(G20_MIN);
    H20_MIN = isNaN(parseFloat(H20_MIN)) ? 0.0 : parseFloat(H20_MIN);
    I20_MIN = isNaN(parseFloat(I20_MIN)) ? 0.0 : parseFloat(I20_MIN);
    J20_MIN = isNaN(parseFloat(J20_MIN)) ? 0.0 : parseFloat(J20_MIN);
    K20_MIN = isNaN(parseFloat(K20_MIN)) ? 0.0 : parseFloat(K20_MIN);
    L20_MIN = isNaN(parseFloat(L20_MIN)) ? 0.0 : parseFloat(L20_MIN);
    M20_MIN = isNaN(parseFloat(M20_MIN)) ? 0.0 : parseFloat(M20_MIN);
    N20_MIN = isNaN(parseFloat(N20_MIN)) ? 0.0 : parseFloat(N20_MIN);
    O20_MIN = isNaN(parseFloat(O20_MIN)) ? 0.0 : parseFloat(O20_MIN);
    P20_MIN = isNaN(parseFloat(P20_MIN)) ? 0.0 : parseFloat(P20_MIN);
    Q20_MIN = isNaN(parseFloat(Q20_MIN)) ? 0.0 : parseFloat(Q20_MIN);
    R20_MIN = isNaN(parseFloat(R20_MIN)) ? 0.0 : parseFloat(R20_MIN);
    S20_MIN = isNaN(parseFloat(S20_MIN)) ? 0.0 : parseFloat(S20_MIN);
    T20_MIN = isNaN(parseFloat(T20_MIN)) ? 0.0 : parseFloat(T20_MIN);
    U20_MIN = isNaN(parseFloat(U20_MIN)) ? 0.0 : parseFloat(U20_MIN);
    V20_MIN = isNaN(parseFloat(V20_MIN)) ? 0.0 : parseFloat(V20_MIN);
    D20_MAX = isNaN(parseFloat(D20_MAX)) ? 0.0 : parseFloat(D20_MAX);
    E20_MAX = isNaN(parseFloat(E20_MAX)) ? 0.0 : parseFloat(E20_MAX);
    F20_MAX = isNaN(parseFloat(F20_MAX)) ? 0.0 : parseFloat(F20_MAX);
    G20_MAX = isNaN(parseFloat(G20_MAX)) ? 0.0 : parseFloat(G20_MAX);
    H20_MAX = isNaN(parseFloat(H20_MAX)) ? 0.0 : parseFloat(H20_MAX);
    I20_MAX = isNaN(parseFloat(I20_MAX)) ? 0.0 : parseFloat(I20_MAX);
    J20_MAX = isNaN(parseFloat(J20_MAX)) ? 0.0 : parseFloat(J20_MAX);
    K20_MAX = isNaN(parseFloat(K20_MAX)) ? 0.0 : parseFloat(K20_MAX);
    L20_MAX = isNaN(parseFloat(L20_MAX)) ? 0.0 : parseFloat(L20_MAX);
    M20_MAX = isNaN(parseFloat(M20_MAX)) ? 0.0 : parseFloat(M20_MAX);
    N20_MAX = isNaN(parseFloat(N20_MAX)) ? 0.0 : parseFloat(N20_MAX);
    O20_MAX = isNaN(parseFloat(O20_MAX)) ? 0.0 : parseFloat(O20_MAX);
    P20_MAX = isNaN(parseFloat(P20_MAX)) ? 0.0 : parseFloat(P20_MAX);
    Q20_MAX = isNaN(parseFloat(Q20_MAX)) ? 0.0 : parseFloat(Q20_MAX);
    R20_MAX = isNaN(parseFloat(R20_MAX)) ? 0.0 : parseFloat(R20_MAX);
    S20_MAX = isNaN(parseFloat(S20_MAX)) ? 0.0 : parseFloat(S20_MAX);
    T20_MAX = isNaN(parseFloat(T20_MAX)) ? 0.0 : parseFloat(T20_MAX);
    U20_MAX = isNaN(parseFloat(U20_MAX)) ? 0.0 : parseFloat(U20_MAX);
    V20_MAX = isNaN(parseFloat(V20_MAX)) ? 0.0 : parseFloat(V20_MAX);
    C30_LSF_PR = isNaN(parseFloat(C30_LSF_PR)) ? 0.0 : parseFloat(C30_LSF_PR);
    C31_SM_PR = isNaN(parseFloat(C31_SM_PR)) ? 0.0 : parseFloat(C31_SM_PR);
    C32_AM_PR = isNaN(parseFloat(C32_AM_PR)) ? 0.0 : parseFloat(C32_AM_PR);
    F30_LSF_TG = isNaN(parseFloat(F30_LSF_TG)) ? 0.0 : parseFloat(F30_LSF_TG);
    F31_SM_TG = isNaN(parseFloat(F31_SM_TG)) ? 0.0 : parseFloat(F31_SM_TG);
    F32_AM_TG = isNaN(parseFloat(F32_AM_TG)) ? 0.0 : parseFloat(F32_AM_TG);
    E33_Clinker_Factor = isNaN(parseFloat(E33_Clinker_Factor))
      ? 0.0
      : parseFloat(E33_Clinker_Factor);
    H31_SiO2 = isNaN(parseFloat(H31_SiO2)) ? 0.0 : parseFloat(H31_SiO2);
    I31_Al2O3 = isNaN(parseFloat(I31_Al2O3)) ? 0.0 : parseFloat(I31_Al2O3);
    J31_Fe2O3 = isNaN(parseFloat(J31_Fe2O3)) ? 0.0 : parseFloat(J31_Fe2O3);
    K31_CaO = isNaN(parseFloat(K31_CaO)) ? 0.0 : parseFloat(K31_CaO);
    L31_MgO = isNaN(parseFloat(L31_MgO)) ? 0.0 : parseFloat(L31_MgO);
    M31_Na2O = isNaN(parseFloat(M31_Na2O)) ? 0.0 : parseFloat(M31_Na2O);
    N31_K2O = isNaN(parseFloat(N31_K2O)) ? 0.0 : parseFloat(N31_K2O);
    O31_SO3 = isNaN(parseFloat(O31_SO3)) ? 0.0 : parseFloat(O31_SO3);
    P31_Cl = isNaN(parseFloat(P31_Cl)) ? 0.0 : parseFloat(P31_Cl);
    Q31_LOI = isNaN(parseFloat(Q31_LOI)) ? 0.0 : parseFloat(Q31_LOI);
    R31_total = isNaN(parseFloat(R31_total)) ? 0.0 : parseFloat(R31_total);
    S31_LSF = isNaN(parseFloat(S31_LSF)) ? 0.0 : parseFloat(S31_LSF);
    T31_HM = isNaN(parseFloat(T31_HM)) ? 0.0 : parseFloat(T31_HM);
    U31_SM = isNaN(parseFloat(U31_SM)) ? 0.0 : parseFloat(U31_SM);
    V31_AM = isNaN(parseFloat(V31_AM)) ? 0.0 : parseFloat(V31_AM);
    H35_SiO2 = isNaN(parseFloat(H35_SiO2)) ? 0.0 : parseFloat(H35_SiO2);
    I35_Al2O3 = isNaN(parseFloat(I35_Al2O3)) ? 0.0 : parseFloat(I35_Al2O3);
    J35_Fe2O3 = isNaN(parseFloat(J35_Fe2O3)) ? 0.0 : parseFloat(J35_Fe2O3);
    K35_CaO = isNaN(parseFloat(K35_CaO)) ? 0.0 : parseFloat(K35_CaO);
    L35_MgO = isNaN(parseFloat(L35_MgO)) ? 0.0 : parseFloat(L35_MgO);
    M35_Na2O = isNaN(parseFloat(M35_Na2O)) ? 0.0 : parseFloat(M35_Na2O);
    N35_K2O = isNaN(parseFloat(N35_K2O)) ? 0.0 : parseFloat(N35_K2O);
    O35_SO3 = isNaN(parseFloat(O35_SO3)) ? 0.0 : parseFloat(O35_SO3);
    P35_Cl = isNaN(parseFloat(P35_Cl)) ? 0.0 : parseFloat(P35_Cl);
    Q35_ECC_total = isNaN(parseFloat(Q35_ECC_total))
      ? 0.0
      : parseFloat(Q35_ECC_total);
    S35_LSF = isNaN(parseFloat(S35_LSF)) ? 0.0 : parseFloat(S35_LSF);
    T35_HM = isNaN(parseFloat(T35_HM)) ? 0.0 : parseFloat(T35_HM);
    U35_SM = isNaN(parseFloat(U35_SM)) ? 0.0 : parseFloat(U35_SM);
    V35_AM = isNaN(parseFloat(V35_AM)) ? 0.0 : parseFloat(V35_AM);
    L38_KL_LOI = isNaN(parseFloat(L38_KL_LOI)) ? 0.0 : parseFloat(L38_KL_LOI);
    V38_LOI = isNaN(parseFloat(V38_LOI)) ? 0.0 : parseFloat(V38_LOI);
    K38_DOC = isNaN(parseFloat(K38_DOC)) ? 0.0 : parseFloat(K38_DOC);
    M38_C3Snet = isNaN(parseFloat(M38_C3Snet)) ? 0.0 : parseFloat(M38_C3Snet);
    N38_C2S = isNaN(parseFloat(N38_C2S)) ? 0.0 : parseFloat(N38_C2S);
    O38_C3A = isNaN(parseFloat(O38_C3A)) ? 0.0 : parseFloat(O38_C3A);
    P38_C4AF = isNaN(parseFloat(P38_C4AF)) ? 0.0 : parseFloat(P38_C4AF);
    Q38_Sulfur_Alkali_ratio = isNaN(parseFloat(Q38_Sulfur_Alkali_ratio))
      ? 0.0
      : parseFloat(Q38_Sulfur_Alkali_ratio);
    R38_total_Alkali = isNaN(parseFloat(R38_total_Alkali))
      ? 0.0
      : parseFloat(R38_total_Alkali);
    S38_Liquid_Phase = isNaN(parseFloat(S38_Liquid_Phase))
      ? 0.0
      : parseFloat(S38_Liquid_Phase);
    T38_Coating_Index = isNaN(parseFloat(T38_Coating_Index))
      ? 0.0
      : parseFloat(T38_Coating_Index);
  }

  //END functions and formulas

  //#endregion
  // END RAMILL MIX D

  // TOGGLE START

  //END functions and formulas

  //Component Table
  function MaterialAnalysis() {
    return (
      <ScrollView>
        <View></View>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <View>
        {/* Table Container */}

        {/* MATERIAL ANALYSIS */}
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "lightgreen",
          }}
        >
          RAWMILL
        </Text>

        <View style={styles.wrapper}>
          {/* SAVE BUTTON */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Save Data" onPress={addData} />
          )}

          <Button title="Clear" onPress={clearall} />
          {/* {showNames()} */}
          {/* <Button title="Export Db" onPress={exportDb} />
            <Button title="Import Db" onPress={importDb} /> */}
          <StatusBar style="auto" />
        </View>

        {/* Table Head */}
        {/* CONDITION MANUAL/AUTOMATIC */}
        <View style={styles.table_head}>
          <View style={{ width: "10%" }}>
            <Text>Condition (M/A)</Text>
          </View>
          <View style={{ width: "5%" }}>
            <Text>Total</Text>
          </View>

          <View style={{ width: "7%" }}>
            <Text>Limestome</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>Shale</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>Sand</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>Iron</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>SiO2</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>Al2O3</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>Fe2O3</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>CaO</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>MgO</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>Na2O</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>K2O</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text>SO3</Text>
          </View>
          <View style={{ width: "6%" }}>
            <Text>Cl</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "10%" }}>
            <View style={styles.switchtext_align}>
              <View style={styles.switch_con}>
                <Text style={{ fontSize: 9, color: "red" }}>(MANUAL)</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "5%" }}>
            {/* ADD A CONDITIONAL STATEMENT IN THIS ROW */}
            <Text style={styles.table_data_yellow}>{result_total_C15}</Text>
          </View>
          <View style={{ width: "7%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setD15(cleanedText);
              }}
              value={D15.toString()}
              placeholder="Input here..."
              onSubmitEditing={() => {
                loadall();
              }}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setE15(cleanedText);
              }}
              value={E15.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setF15(cleanedText);
              }}
              value={F15.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setG15(cleanedText);
              }}
              value={G15.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setH15_SiO2(cleanedText);
              }}
              value={H15_SiO2.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setI15_Al2O3(cleanedText);
              }}
              value={I15_Al2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setJ15_Fe2O3(cleanedText);
              }}
              value={J15_Fe2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setK15_CaO(cleanedText);
              }}
              value={K15_CaO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setL15_MgO(cleanedText);
              }}
              value={L15_MgO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setM15_Na2O(cleanedText);
              }}
              value={M15_Na2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setN15_K2O(cleanedText);
              }}
              value={N15_K2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setO15_SO3(cleanedText);
              }}
              value={O15_SO3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setP15_Cl(cleanedText);
              }}
              value={P15_Cl.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
        </View>

        {/* Table Body */}
        {/* XRF Analysis */}
        {/* 2 */}
        <View style={styles.table_body}>
          <View style={{ width: "10%" }}>
            <View style={styles.switchtext_align}>
              <View style={styles.switch_con}>
                <Switch
                  style={styles.switch}
                  value={C16TotalEnable}
                  onValueChange={(value) => setC16TotalEnable(value)}
                />
                <Text style={{ fontSize: 9 }}>
                  (
                  {C16TotalEnable == true ? (
                    <Text style={{ color: "green", fontSize: 10 }}>AUTO</Text>
                  ) : (
                    <Text style={{ color: "red", fontSize: 10 }}>MANUAL</Text>
                  )}
                  )
                </Text>
              </View>
            </View>
          </View>
          {/* ADD A CONDITIONAL STATEMENT IN THIS ROW */}
          <View style={{ width: "5%" }}>
            <Text style={styles.table_data_yellow}>{resulttotal_C16}</Text>
          </View>
          <View style={{ width: "7%" }}>
            {!C16TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={D16_Limestome.toString()}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9.]/g, "");
                  const decimalCount = text.split(".").length - 1;
                  if (decimalCount > 1) {
                    return;
                  }

                  setD16_Limestome(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{D16_Limestome}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C16TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={E16_Shale.toString()}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9.]/g, "");
                  const decimalCount = text.split(".").length - 1;
                  if (decimalCount > 1) {
                    return;
                  }
                  setE16_Shale(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{E16_Shale}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C16TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={F16_Sand.toString()}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9.]/g, "");
                  const decimalCount = text.split(".").length - 1;
                  if (decimalCount > 1) {
                    return;
                  }
                  setF16_Sand(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{F16_Sand}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C16TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={G16_Iron.toString()}
                onChangeText={(text) => {
                  const cleanedText = text.replace(/[^0-9.]/g, "");
                  const decimalCount = text.split(".").length - 1;
                  if (decimalCount > 1) {
                    return;
                  }
                  setG16_Iron(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{G16_Iron}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setH16_SiO2(cleanedText);
              }}
              value={H16_SiO2.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setI16_Al2O3(cleanedText);
              }}
              value={I16_Al2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setJ16_Fe2O3(cleanedText);
              }}
              value={J16_Fe2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setK16_CaO(cleanedText);
              }}
              value={K16_CaO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setL16_MgO(cleanedText);
              }}
              value={L16_MgO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setM16_Na2O(cleanedText);
              }}
              value={M16_Na2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setN16_K2O(cleanedText);
              }}
              value={N16_K2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setO16_SO3(cleanedText);
              }}
              value={O16_SO3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setP16_Cl(cleanedText);
              }}
              value={P16_Cl.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          {/* END TABLE BODY */}
        </View>

        {/* Table Body */}
        {/* XRF Analysis */}
        {/* 3 */}
        <View style={styles.table_body}>
          <View style={{ width: "10%" }}>
            <View style={styles.switchtext_align}>
              <View style={styles.switch_con}>
                <Switch
                  style={styles.switch}
                  value={C17TotalEnable}
                  onValueChange={(value) => setC17TotalEnable(value)}
                />
                <Text style={{ fontSize: 9 }}>
                  (
                  {C17TotalEnable == true ? (
                    <Text style={{ color: "green", fontSize: 10 }}>AUTO</Text>
                  ) : (
                    <Text style={{ color: "red", fontSize: 10 }}>MANUAL</Text>
                  )}
                  )
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "5%" }}>
            {/* ADD A CONDITIONAL STATEMENT IN THIS ROW */}

            <Text style={styles.table_data_yellow}>{resulttotal_C17}</Text>
          </View>
          <View style={{ width: "7%" }}>
            {!C17TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={D17_Limestome.toString()}
                onChangeText={(text) => {
                  setD17_Limestome(text);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{D17_Limestome}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C17TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={E17_Shale.toString()}
                onChangeText={(text) => {
                  setE17_Shale(text);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{E17_Shale}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C17TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={F17_Sand.toString()}
                onChangeText={(text) => {
                  setF17_Sand(text);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{F17_Sand}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C17TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={G17_Iron.toString()}
                onChangeText={(text) => {
                  setG17_Iron(text);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{G17_Iron}</Text>
            )}
          </View>

          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setH17_SiO2(cleanedText);
              }}
              value={H17_SiO2.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setI17_Al2O3(cleanedText);
              }}
              value={I17_Al2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setJ17_Fe2O3(cleanedText);
              }}
              value={J17_Fe2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setK17_CaO(cleanedText);
              }}
              value={K17_CaO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setL17_MgO(cleanedText);
              }}
              value={L17_MgO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setM17_Na2O(cleanedText);
              }}
              value={M17_Na2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setN17_K2O(cleanedText);
              }}
              value={N17_K2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setO17_SO3(cleanedText);
              }}
              value={O17_SO3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setP17_Cl(cleanedText);
              }}
              value={P17_Cl.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
        </View>

        {/* Table Body */}
        {/* XRF Analysis */}
        {/* 4 */}
        <View style={styles.table_body}>
          <View style={{ width: "10%" }}>
            <View style={styles.switchtext_align}>
              <View style={styles.switch_con}>
                <Switch
                  style={styles.switch}
                  value={C18TotalEnable}
                  onValueChange={(value) => setC18TotalEnable(value)}
                />
                <Text style={{ fontSize: 9 }}>
                  (
                  {C18TotalEnable == true ? (
                    <Text style={{ color: "green", fontSize: 10 }}>AUTO</Text>
                  ) : (
                    <Text style={{ color: "red", fontSize: 10 }}>MANUAL</Text>
                  )}
                  )
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "5%" }}>
            {/* ADD A CONDITIONAL STATEMENT IN THIS ROW */}

            <Text style={styles.table_data_yellow}>{resulttotal_C18}</Text>
          </View>
          <View style={{ width: "7%" }}>
            {!C18TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={D18_Limestome.toString()}
                onChangeText={(text) => {
                  setD18_Limestome(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{D18_Limestome}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C18TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={E18_Shale.toString()}
                onChangeText={(text) => {
                  setE18_Shale(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{E18_Shale}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C18TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={F18_Sand.toString()}
                onChangeText={(text) => {
                  setF18_Sand(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{F18_Sand}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C18TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={G18_Iron.toString()}
                onChangeText={(text) => {
                  setG18_Iron(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{G18_Iron}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setH18_SiO2(cleanedText);
              }}
              value={H18_SiO2.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setI18_Al2O3(cleanedText);
              }}
              value={I18_Al2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setJ18_Fe2O3(cleanedText);
              }}
              value={J18_Fe2O3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setK18_CaO(cleanedText);
              }}
              value={K18_CaO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setL18_MgO(cleanedText);
              }}
              value={L18_MgO.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setM18_Na2O(cleanedText);
              }}
              value={M18_Na2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setN18_K2O(cleanedText);
              }}
              value={N18_K2O.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6.5%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setO18_SO3(cleanedText);
              }}
              value={O18_SO3.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
          <View style={{ width: "6%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setP18_Cl(cleanedText);
              }}
              value={P18_Cl.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
        </View>

        {/* 19 */}
        <View style={styles.table_body}>
          <View style={{ width: "10%" }}>
            <View style={styles.switchtext_align}>
              <View style={styles.switch_con}>
                <Switch
                  style={styles.switch}
                  value={C19TotalEnable}
                  onValueChange={(value) => setC19TotalEnable(value)}
                />
                <Text style={{ fontSize: 9 }}>
                  (
                  {C19TotalEnable == true ? (
                    <Text style={{ color: "green", fontSize: 10 }}>AUTO</Text>
                  ) : (
                    <Text style={{ color: "red", fontSize: 10 }}>MANUAL</Text>
                  )}
                  )
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: "5%" }}>
            {/* ADD A CONDITIONAL STATEMENT IN THIS ROW */}

            <Text style={styles.table_data_yellow}>{resulttotal_C19}</Text>
          </View>
          <View style={{ width: "7%" }}>
            {!C19TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={D19_Limestome.toString()}
                onChangeText={(text) => {
                  setD19_Limestome(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{D19_Limestome}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C19TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={E19_Shale.toString()}
                onChangeText={(text) => {
                  setE19_Shale(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{E19_Shale}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C19TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={F19_Sand.toString()}
                onChangeText={(text) => {
                  setF19_Sand(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{F19_Sand}</Text>
            )}
          </View>
          <View style={{ width: "6.5%" }}>
            {!C19TotalEnable ? (
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                value={G19_Iron.toString()}
                onChangeText={(text) => {
                  setG19_Iron(cleanedText);
                }}
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              />
            ) : (
              <Text style={styles.table_data_yellow}>{G19_Iron}</Text>
            )}
          </View>
        </View>

        {/* START AVG STDEV MIN MAX*/}
        <View style={styles.table_body}>
          {/* Table Body */}
          <View style={{ width: "15%" }}>
            <Text>AVG</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{D20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{E20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{F20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{G20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{H20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{I20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{J20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{K20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{L20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{M20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{N20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{O20_AVG}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{P20_AVG}</Text>
          </View>
        </View>

        {/* Table Body */}

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>STDEV</Text>
          </View>
          <View style={{ width: "7%" }}>
            <Text style={styles.table_data_yellow}>{D20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{E20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{F20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{G20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{H20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{I20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{J20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{K20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{L20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{M20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{N20_STDEV}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{O20_STDEV}</Text>
          </View>
          <View style={{ width: "6%" }}>
            <Text style={styles.table_data_yellow}>{P20_STDEV}</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>MIN</Text>
          </View>
          <View style={{ width: "7%" }}>
            <Text style={styles.table_data_yellow}>{D20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{E20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{F20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{G20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{H20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{I20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{J20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{K20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{L20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{M20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{N20_MIN}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{O20_MIN}</Text>
          </View>
          <View style={{ width: "6%" }}>
            <Text style={styles.table_data_yellow}>{P20_MIN}</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>MAX</Text>
          </View>
          <View style={{ width: "7%" }}>
            <Text style={styles.table_data_yellow}>{D20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{E20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{F20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{G20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{H20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{I20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{J20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{K20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{L20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{M20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{N20_MAX}</Text>
          </View>
          <View style={{ width: "6.5%" }}>
            <Text style={styles.table_data_yellow}>{O20_MAX}</Text>
          </View>
          <View style={{ width: "6%" }}>
            <Text style={styles.table_data_yellow}>{P20_MAX}</Text>
          </View>
        </View>
        {/* END  */}

        {/* XRF Analysis */}
        <View>
          <View style={styles.table_head}>
            <View style={{ width: "20%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "35%" }}>
              <Text>XRF Analysis</Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text>RATIO</Text>
            </View>
          </View>

          <View style={styles.table_head}>
            <View style={{ width: "15%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text>LOI</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text>TOTAL</Text>
            </View>

            <View style={{ width: "10%" }}>
              <Text>LSF</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text>HM</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text>SM</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text>AM</Text>
            </View>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}></View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {Q15_LOI}
            </Text>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {Q16_LOI}
            </Text>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {Q17_LOI}
            </Text>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {Q18_LOI}
            </Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {R15_XRFtotal}
            </Text>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {R16_XRFtotal}
            </Text>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {R17_XRFtotal}
            </Text>
            <Text style={styles.table_data_yellow} placeholder="0.00">
              {R18_XRFtotal}
            </Text>
          </View>

          {/* START RATIOS */}
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}> {S15_LSF}</Text>
            <Text style={styles.table_data_yellow}>{S16_LSF}</Text>
            <Text style={styles.table_data_yellow}>{S17_LSF}</Text>
            <Text style={styles.table_data_yellow}>{S18_LSF}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{T15_HM}</Text>
            <Text style={styles.table_data_yellow}>{T16_HM}</Text>
            <Text style={styles.table_data_yellow}>{T17_HM}</Text>
            <Text style={styles.table_data_yellow}>{T18_HM}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{U15_SM}</Text>
            <Text style={styles.table_data_yellow}>{U16_SM}</Text>
            <Text style={styles.table_data_yellow}>{U17_SM}</Text>
            <Text style={styles.table_data_yellow}>{U18_SM}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{V15_AM}</Text>
            <Text style={styles.table_data_yellow}>{V16_AM}</Text>
            <Text style={styles.table_data_yellow}>{V17_AM}</Text>
            <Text style={styles.table_data_yellow}>{V18_AM}</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>AVERAGE</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{Q20_AVG}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{R20_AVG}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{S20_AVG}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{T20_AVG}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{U20_AVG}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{V20_AVG}</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>STDEV</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{Q20_STDEV}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{R20_STDEV}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{S20_STDEV}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{T20_STDEV}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{U20_STDEV}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{V20_STDEV}</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>MIN</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{Q20_MIN}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{R20_MIN}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{S20_MIN}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{T20_MIN}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{U20_MIN}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{V20_MIN}</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%" }}>
            <Text>MAX</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{Q20_MAX}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{R20_MAX}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{S20_MAX}</Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{T20_MAX}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{U20_MAX}</Text>
          </View>

          <View style={{ width: "10%" }}>
            <Text style={styles.table_data_yellow}>{V20_MAX}</Text>
          </View>
        </View>

        {/* END XRF */}
        {/* END RATIOS */}

        {/* AVG STDEV MIN MAX */}

        {/* Average/ STDEV / MIN / MAX */}
        {/* Table Head */}
        {/* CONDITION MANUAL/AUTOMATIC */}
        {/* ******AVG**** */}

        {/* END AVG STD MIN MAX */}

        {/*****************  INPUT VAR **************************************/}

        <Text style={{ textAlign: "center", backgroundColor: "orange" }}>
          Input Variable
        </Text>
        {/* MPriority */}

        <View>
          <View style={styles.table_head}>
            <View style={{ width: "40%" }}>
              <Text>Priority</Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text>Target</Text>
            </View>
          </View>
        </View>

        {/* Table Body */}
        <View style={styles.table_body}>
          {/* PRIORITY */}
          <View style={{ width: "20%" }}>
            <Text>LSF</Text>
            <Text>SM</Text>
            <Text>AM</Text>
          </View>

          {/* Table Body */}
          {/* 1 */}
          <View style={{ width: "20%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setC30_LSF_PR(cleanedText);
              }}
              value={C30_LSF_PR.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setC31_SM_PR(cleanedText);
              }}
              value={C31_SM_PR.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setC32_AM_PR(cleanedText);
              }}
              value={C32_AM_PR.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>

          {/* TARGET */}
          <View style={{ width: "20%" }}>
            <Text>LSF</Text>
            <Text>SM</Text>
            <Text>AM</Text>
          </View>

          <View style={{ width: "20%" }}>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setF30_LSF_TG(cleanedText);
              }}
              value={F30_LSF_TG.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setF31_SM_TG(cleanedText);
              }}
              value={F31_SM_TG.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
            <TextInput
              keyboardType="numeric"
              style={styles.table_data}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^0-9.]/g, "");
                const decimalCount = text.split(".").length - 1;
                if (decimalCount > 1) {
                  return;
                }
                setF32_AM_TG(cleanedText);
              }}
              value={F32_AM_TG.toString()}
              placeholder="Input here..."
              onSubmitEditing={loadall}
              onFocus={emptyinput}
            ></TextInput>
          </View>
        </View>

        {/*************** END MATERIAL ANALYSIS ***************/}

        {/* ************** Target Rawmeal Composition************ */}
        <View>
          <Text></Text>
        </View>
        <View>
          <Text style={styles.table_head}>Target Rawmeal Composition</Text>

          {/* Table Body */}
          <View style={styles.table_head}>
            <View style={{ width: "6.5%" }}>
              <Text>SiO2</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Al2O3</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Fe2O3</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>CaO</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>MgO</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Na2O</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>K2O</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>SO3</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Cl</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>LOI</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>LSF</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>HM</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>SM</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>AM</Text>
            </View>
          </View>

          <View style={styles.table_body}>
            {/* Table Body */}
            {/* TARGET RAW MEAL*/}
            {/* 1 */}

            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setH31_SiO2(text)}
                value={H31_SiO2.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setI31_Al2O3(text)}
                value={I31_Al2O3.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setJ31_Fe2O3(text)}
                value={J31_Fe2O3.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setK31_CaO(text)}
                value={K31_CaO.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setL31_MgO(text)}
                value={L31_MgO.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setM31_Na2O(text)}
                value={M31_Na2O.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setN31_K2O(text)}
                value={N31_K2O.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setO31_SO3(text)}
                value={O31_SO3.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setP31_Cl(text)}
                value={P31_Cl.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            {/* Yellow */}
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{Q31_LOI}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{R31_total}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{S31_LSF}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{T31_HM}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{U31_SM}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{V31_AM}</Text>
            </View>
          </View>

          {/* End Target Rawmeal Composition */}

          {/* ************ Expected Clicker Composition************ */}
          <View></View>
          <Text style={styles.table_head}>Expected Clicker Composition</Text>

          {/* Table Body */}
          <View style={styles.table_head}>
            <View style={{ width: "6.5%" }}>
              <Text>SiO2</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Al2O3</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Fe2O3</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>CaO</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>MgO</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Na2O</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>K2O</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>SO3</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>Cl</Text>
            </View>
            <View style={{ width: "13%" }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>LSF</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>HM</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>SM</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text>AM</Text>
            </View>
          </View>

          {/* Table Body */}
          {/* XRF Analysis */}
          {/* 1 */}

          <View style={styles.table_body}>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{H35_SiO2}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{I35_Al2O3}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{J35_Fe2O3}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{K35_CaO}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{L35_MgO}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{M35_Na2O}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{N35_K2O}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{O35_SO3}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{P35_Cl}</Text>
            </View>
            <View style={{ width: "13%" }}>
              <Text style={styles.table_data_yellow}>{Q35_ECC_total}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{S35_LSF}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{T35_HM}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{U35_SM}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{V35_AM}</Text>
            </View>
          </View>

          <View style={styles.table_head}>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>Liter wt. kg.</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>FCaO</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>Burning Condition</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>DOC</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>KF LOI</Text>
            </View>

            <View style={{ width: "26%" }}>
              <Text>MINERALS</Text>
              <View style={styles.table_body}>
                <View style={{ width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>C3S net</Text>
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>C2S</Text>
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>C3A</Text>
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={{ fontSize: 10 }}>C4AF</Text>
                </View>
              </View>
            </View>

            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>Sulfur Alkali Ratio</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>Total Alkali</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>Liquid Phase</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={{ fontSize: 10 }}>Coating Index</Text>
            </View>

            <View style={{ width: "13%" }}>
              <Text style={{ fontSize: 10 }}>Hotmeal</Text>
              <View style={styles.table_body}>
                <View style={{ width: "50%" }}>
                  <Text style={{ fontSize: 10 }}>%SO3</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={{ fontSize: 10 }}>LOI</Text>
                </View>
              </View>
            </View>
          </View>

          {/****************  END OF TESTING TARGET COMPOSITION *******************/}

          <View style={styles.table_body}>
            <View style={{ width: "6.5%" }}>
              <Text></Text>
            </View>

            <View style={{ width: "6.5%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <Text style={styles.table_data_yellow}>{K38_DOC}</Text>
            </View>
            <View style={{ width: "6.5%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setL38_KL_LOI(text)}
                value={L38_KL_LOI.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>

            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{M38_C3Snet}</Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{N38_C2S}</Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{O38_C3A}</Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{P38_C4AF}</Text>
            </View>

            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>
                {Q38_Sulfur_Alkali_ratio}
              </Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{R38_total_Alkali}</Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{S38_Liquid_Phase}</Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text style={styles.table_data_yellow}>{T38_Coating_Index}</Text>
            </View>

            <View style={{ width: "6.5%", fontSize: 16 }}>
              <Text></Text>
            </View>
            <View style={{ width: "6.5%", fontSize: 16 }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setV38_LOI(text)}
                value={V38_LOI.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall}
                onFocus={emptyinput}
              ></TextInput>
            </View>
          </View>
        </View>

        {/* ****************End Target Rawmeal Composition***************** */}

        {/* RAWMILL D FOUR COMPONENT */}
        {/********************************************** MIX % ************************** */}
        <Text style={{ fontSize: 14, marginTop: 15, backgroundColor: "green" }}>
          ' - - - - - - - - - RAWMIX D By Four Components - - - - - - - - -{" "}
        </Text>
        <View>
          <View style={styles.wrapper}>
            {/* SAVE BUTTON RMD*/}
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              // <SaveModal />
              <Button title="Save RMD Data " onPress={addData2} />
            )}

            <Button title="Clear" onPress={clearall2} />
            {/* {showNames()} */}
            {/* <Button title="Export Db" onPress={exportDb} />
            <Button title="Import Db" onPress={importDb} /> */}
            <StatusBar style="auto" />
          </View>
          {/* table saved list */}
          <View></View>

          <View style={styles.table_head}>
            <View style={{ width: "15%" }}>
              <View>
                <Text></Text>
              </View>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_head}>LIMESTONE</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_head}>SHALE</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_head}>SAND</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_head}>IRON ORE</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_head}>RAWMEAL</Text>
            </View>
          </View>

          {/* MIX */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>MIX %</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC8_MIX_RDFC(text)}
                value={C8_MIX_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD8_MIX_RDFC(text)}
                value={D8_MIX_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE8_MIX_RDFC(text)}
                value={E8_MIX_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF8_MIX_RDFC(text)}
                value={F8_MIX_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G8_MIX_RDFC}</Text>
            </View>
          </View>
          {/* SiO2 */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>SiO2</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC9_SiO2_RDFC(text)}
                value={C9_SiO2_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD9_SiO2_RDFC(text)}
                value={D9_SiO2_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE9_SiO2_RDFC(text)}
                value={E9_SiO2_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF9_SiO2_RDFC(text)}
                value={F9_SiO2_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G9_SiO2_RDFC}</Text>
            </View>
          </View>
          {/* Al2O3 */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>Al2O3</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC10_Al2O3_RDFC(text)}
                value={C10_Al2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD10_Al2O3_RDFC(text)}
                value={D10_Al2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE10_Al2O3_RDFC(text)}
                value={E10_Al2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF10_Al2O3_RDFC(text)}
                value={F10_Al2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G10_Al2O3_RDFC}</Text>
            </View>
          </View>
          {/* Fe2O3 */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>Fe2O3</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC11_Fe2O3_RDFC(text)}
                value={C11_Fe2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD11_Fe2O3_RDFC(text)}
                value={D11_Fe2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE11_Fe2O3_RDFC(text)}
                value={E11_Fe2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF11_Fe2O3_RDFC(text)}
                value={F11_Fe2O3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G11_Fe2O3_RDFC}</Text>
            </View>
          </View>
          {/* CaO */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>CaO</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC12_CaO_RDFC(text)}
                value={C12_CaO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD12_CaO_RDFC(text)}
                value={D12_CaO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE12_CaO_RDFC(text)}
                value={E12_CaO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF12_CaO_RDFC(text)}
                value={F12_CaO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G12_CaO_RDFC}</Text>
            </View>
          </View>
          {/* MgO */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>MgO</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC13_MgO_RDFC(text)}
                value={C13_MgO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD13_MgO_RDFC(text)}
                value={D13_MgO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE13_MgO_RDFC(text)}
                value={E13_MgO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF13_MgO_RDFC(text)}
                value={F13_MgO_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G13_MgO_RDFC}</Text>
            </View>
          </View>
          {/* Na2O */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>Na2O</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC14_Na2O_RDFC(text)}
                value={C14_Na2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD14_Na2O_RDFC(text)}
                value={D14_Na2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE14_Na2O_RDFC(text)}
                value={E14_Na2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF14_Na2O_RDFC(text)}
                value={F14_Na2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G14_Na2O_RDFC}</Text>
            </View>
          </View>
          {/* K2O */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>K2O</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC15_K2O_RDFC(text)}
                value={C15_K2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD15_K2O_RDFC(text)}
                value={D15_K2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE15_K2O_RDFC(text)}
                value={E15_K2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF15_K2O_RDFC(text)}
                value={F15_K2O_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G15_K2O_RDFC}</Text>
            </View>
          </View>
          {/* SO3 */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>SO3</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC16_SO3_RDFC(text)}
                value={C16_SO3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD16_SO3_RDFC(text)}
                value={D16_SO3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE16_SO3_RDFC(text)}
                value={E16_SO3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF16_SO3_RDFC(text)}
                value={F16_SO3_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G16_SO3_RDFC}</Text>
            </View>
          </View>
          {/* LOI */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>LOI</Text>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setC17_LOI_RDFC(text)}
                value={C17_LOI_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setD17_LOI_RDFC(text)}
                value={D17_LOI_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setE17_LOI_RDFC(text)}
                value={E17_LOI_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setF17_LOI_RDFC(text)}
                value={F17_LOI_RDFC.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G17_LOI_RDFC}</Text>
            </View>
          </View>
          {/* TOTAL */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>TOTAL</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{C18_TOTAL_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{D18_TOTAL_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{E18_TOTAL_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{F18_TOTAL_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G18_TOTAL_RDFC}</Text>
            </View>
          </View>
          {/* LSF */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>LSF</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{C19_LSF_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{D19_LSF_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{E19_LSF_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{F19_LSF_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G19_LSF_RDFC}</Text>
            </View>
          </View>
          {/* SM */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>SM</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{C20_SM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{D20_SM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{E20_SM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{F20_SM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G20_SM_RDFC}</Text>
            </View>
          </View>
          {/* AM */}
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <Text>AM</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{C21_AM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{D21_AM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{E21_AM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{F21_AM_RDFC}</Text>
            </View>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_data_yellow}>{G21_AM_RDFC}</Text>
            </View>
          </View>

          {/* RAWMEAL TARGETS D */}
          <View>
            <View style={styles.table_head}>
              <Text>RAWMEAL TARGETS</Text>
            </View>
            <View style={styles.table_head}>
              <View style={{ width: "15%" }}>
                <Text>Lime Saturation</Text>
              </View>
              <View style={{ width: "15%" }}>
                <Text>Silica Modulus</Text>
              </View>
              <View style={{ width: "15%" }}>
                <Text>Alumina Modulus</Text>
              </View>
            </View>
          </View>
          <View style={styles.table_body}>
            <View style={{ width: "15%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setI14_Lime_Saturation(text)}
                value={I14_Lime_Saturation.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "15%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={(text) => setI17_Silica_Modulus(text)}
                value={I17_Silica_Modulus.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
            <View style={{ width: "15%" }}>
              <TextInput
                keyboardType="numeric"
                style={styles.table_data}
                onChangeText={async (text) => setI20_Alumina_Modulus(text)}
                value={I20_Alumina_Modulus.toString()}
                placeholder="Input here..."
                onSubmitEditing={loadall2}
                onFocus={emptyinput}
              ></TextInput>
            </View>
          </View>
        </View>
        {/********************************** END  MIX % *****************************/}

        {/*******************************COEFFICIENTS **************************/}
        <View>
          <View style={styles.table_head}>
            <View style={{ width: "5%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text style={styles.table_head}>COEFFICIENTS</Text>
            </View>
            <View style={{ width: "5%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text style={styles.table_head}>MATRIX DETERMINANTS</Text>
            </View>
            <View style={{ width: "5%" }}>
              <Text></Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text style={styles.table_head}>RAW MATERIALS %</Text>
            </View>
          </View>

          <View style={{ width: "5%" }}>
            <Text></Text>
          </View>
          <View style={styles.table_body}>
            <View style={{ width: "10%" }}>
              <Text style={styles.table_head_vertical}>a</Text>
              <Text style={styles.table_head_vertical}>b</Text>
              <Text style={styles.table_head_vertical}>c</Text>
              <Text style={styles.table_head_vertical}>d</Text>
              <Text style={styles.table_head_vertical}>e</Text>
              <Text style={styles.table_head_vertical}>f</Text>
              <Text style={styles.table_head_vertical}>g</Text>
              <Text style={styles.table_head_vertical}>h</Text>
              <Text style={styles.table_head_vertical}>i</Text>
              <Text style={styles.table_head_vertical}>k</Text>
              <Text style={styles.table_head_vertical}>l</Text>
              <Text style={styles.table_head_vertical}>m</Text>
              <Text style={styles.table_head_vertical}>n</Text>
              <Text style={styles.table_head_vertical}>p</Text>
              <Text style={styles.table_head_vertical}>q</Text>
              <Text style={styles.table_head_vertical}>r</Text>
              <Text style={styles.table_head_vertical}>s</Text>
            </View>

            <View style={{ width: "20%" }}>
              {/* Yellow */}
              <Text style={styles.table_data_yellow}>{L8_a}</Text>
              <Text style={styles.table_data_yellow}>{L9_b}</Text>
              <Text style={styles.table_data_yellow}>{L10_c}</Text>
              <Text style={styles.table_data_yellow}>{L11_d}</Text>
              <Text style={styles.table_data_yellow}>{L12_e}</Text>
              <Text style={styles.table_data_yellow}>{L13_f}</Text>
              <Text style={styles.table_data_yellow}>{L14_g}</Text>
              <Text style={styles.table_data_yellow}>{L15_h}</Text>
              <Text style={styles.table_data_yellow}>{L16_i}</Text>
              <Text style={styles.table_data_yellow}>{L17_k}</Text>
              <Text style={styles.table_data_yellow}>{L18_l}</Text>
              <Text style={styles.table_data_yellow}>{L19_m}</Text>
              <Text style={styles.table_data_yellow}>{L20_n}</Text>
              <Text style={styles.table_data_yellow}>{L21_p}</Text>
              <Text style={styles.table_data_yellow}>{L22_q}</Text>
              <Text style={styles.table_data_yellow}>{L23_r}</Text>
              <Text style={styles.table_data_yellow}>{L24_s}</Text>
            </View>

            <View style={{ width: "5%" }}>
              <Text></Text>
            </View>

            <View style={{ width: "10%" }}>
              <Text style={styles.table_head_vertical}>Dw</Text>
              <Text style={styles.table_head_vertical}>Dx</Text>
              <Text style={styles.table_head_vertical}>Dy</Text>
              <Text style={styles.table_head_vertical}>Dz</Text>
              <Text style={styles.table_head_vertical}>D</Text>
            </View>

            <View style={{ width: "20%" }}>
              {/* Yellow */}
              <Text style={styles.table_data_yellow}>{O8_Dw_Matrix}</Text>
              <Text style={styles.table_data_yellow}>{O9_Dx_Matrix}</Text>
              <Text style={styles.table_data_yellow}>{O10_Dy_Matrix}</Text>
              <Text style={styles.table_data_yellow}>{O11_Dz_Matrix}</Text>
              <Text style={styles.table_data_yellow}>{O12_D_Matrix}</Text>
            </View>

            <View style={{ width: "5%" }}>
              <Text></Text>
            </View>

            <View style={{ width: "10%" }}>
              <Text style={styles.table_head_vertical}>W (LST)</Text>
              <Text style={styles.table_head_vertical}>X (SHL)</Text>
              <Text style={styles.table_head_vertical}>Y (SIL)</Text>
              <Text style={styles.table_head_vertical}>Z (FE)</Text>
              <Text style={styles.table_head_vertical}>TOTAL</Text>
            </View>

            <View style={{ width: "20%" }}>
              {/* Yellow */}
              <Text style={styles.table_data_yellow}>{O15_W}</Text>
              <Text style={styles.table_data_yellow}>{O16_X}</Text>
              <Text style={styles.table_data_yellow}>{O17_Y}</Text>
              <Text style={styles.table_data_yellow}>{O18_Z}</Text>
              <Text style={styles.table_data_yellow}>{O19_TOTAL}</Text>
            </View>
          </View>
        </View>
        {/************************END COEFFICIENTS **************************/}

        {/* **************LIST OF RAWMILL **********************/}
        <View>
          <View style={styles.table_head}>
            <View style={{ width: "50%" }}>
              <Text>RAW MILL 1 List</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text>RAW MIX D</Text>
            </View>
          </View>

          <View style={styles.table_body}>
            <View style={{ width: "50%" }}>
              <SavedDataList />
              {dataList.length <= 0 ? (
                <Text>Raw Mill 1 has no data.</Text>
              ) : (
                dataList.map((item) => (
                  <View key={item.id} style={styles.table_head}>
                    <View style={{ width: "40%" }}>
                      <Text key={item.id}>
                        {item.id} - {item.name}
                      </Text>
                    </View>
                    <View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Button
                          onPress={() => {
                            loadselectData(item.id);
                            selecteddata();
                          }}
                          key={item.id}
                          style={{ width: "20%" }}
                          title="Load"
                        />
                      )}
                    </View>
                    <View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Button
                          key={item.id}
                          style={{ width: "20%" }}
                          title="Delete"
                          onPress={() => {
                            deleteData(item.id);
                          }}
                        />
                      )}
                    </View>
                    <View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Button
                          key={item.id}
                          style={{ width: "20%" }}
                          title="Update"
                          onPress={() => {
                            updateData(item.id);
                          }}
                        />
                      )}
                    </View>
                  </View>
                ))
              )}
            </View>

            <View style={{ width: "50%" }}>
              <SavedDataList2 />
              {dataList2.length <= 0 ? (
                <Text>RMD has no data.</Text>
              ) : (
                dataList2.map((item) => (
                  <View key={item.id} style={styles.table_head}>
                    <View style={{ width: "40%" }}>
                      <Text key={item.id}>
                        {item.id} - {item.name}
                      </Text>
                    </View>
                    <View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Button
                          onPress={() => {
                            loadselectData2(item.id);
                            selecteddata2();
                          }}
                          key={item.id}
                          style={{ width: "20%" }}
                          title="Load RMD"
                        />
                      )}
                    </View>
                    <View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Button
                          key={item.id}
                          style={{ width: "20%" }}
                          title="Delete"
                          onPress={() => {
                            deleteData2(item.id);
                          }}
                        />
                      )}
                    </View>
                    <View>
                      {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        <Button
                          key={item.id}
                          style={{ width: "20%" }}
                          title="Update"
                          onPress={() => {
                            updateData2(item.id);
                          }}
                        />
                      )}
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
        {/* ****************END LIST OF RAWMILL************* */}
      </View>
    </ScrollView>
  );
};

export default RawMill;
