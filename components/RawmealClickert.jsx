import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const RawmealClickert = () => {
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
  let { Q31_LOI, R31_total, S31_LSF, T31_HM, U31_SM, V31_AM } = 0.0;

  Q31_LOI = 0.786 * K31_CaO + 1.1 * L31_MgO + 0.2;
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
  S31_LSF =
    (K31_CaO * 100) / (2.8 * H31_SiO2 + 1.2 * I31_Al2O3 + 0.65 * J31_Fe2O3);
  T31_HM = K31_CaO / (H31_SiO2 + I31_Al2O3 + J31_Fe2O3);
  U31_SM = H31_SiO2 / (I31_Al2O3 + J31_Fe2O3);
  V31_AM = I31_Al2O3 / J31_Fe2O3;

  //Expected  Clinker Composition

  //fixed cell
  let {
    H35_SiO2,
    I35_Al2O3,
    J35_Fe2O3,
    K35_CaO,
    L35_MgO,
    M35_Na2O,
    N35_K2O,
    O35_SO3,
    P35_Cl,
    Q35_ECC_total,
    S35_LSF,
    T35_HM,
    U35_SM,
    V35_AM,
  } = 0.0;
  H35_SiO2 = E33_Clinker_Factor * H31_SiO2;
  I35_Al2O3 = E33_Clinker_Factor * I31_Al2O3;
  J35_Fe2O3 = E33_Clinker_Factor * J31_Fe2O3;
  K35_CaO = E33_Clinker_Factor * K31_CaO;
  L35_MgO = E33_Clinker_Factor * L31_MgO;
  M35_Na2O = E33_Clinker_Factor * M31_Na2O;
  N35_K2O = E33_Clinker_Factor * N31_K2O;
  O35_SO3 = E33_Clinker_Factor * O31_SO3;
  P35_Cl == E33_Clinker_Factor * P31_Cl;
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
  S35_LSF =
    (K35_CaO * 100) / (2.8 * H35_SiO2 + 1.2 * I35_Al2O3 + 0.65 * J35_Fe2O3);
  T35_HM = K35_CaO / (H35_SiO2 + I35_Al2O3 + J35_Fe2O3);
  U35_SM = H35_SiO2 / (I35_Al2O3 + J35_Fe2O3);
  V35_AM = I35_Al2O3 / J35_Fe2O3;

  //next cell

  //CAN BE CHANGE

  let [H38_literKG, setH38_literKG] = useState(0.0);
  let [I38_FCaO, setI38_FCaO] = useState(0.0);
  let [J38_BurningCondition, setJ38_BurningCondition] = useState(0.0);
  let [L38_KL_LOI, setL38_KL_LOI] = useState(0.0);
  let [U38_SO3, setU38_SO3] = useState(0.0);
  let [V38_LOI, setV38_LOI] = useState(0.0);

  //Fixed cell
  let {
    K38_DOC,
    M38_C3Snet,
    N38_C2S,
    O38_C3A,
    P38_C4AF,
    Q38_Sulfur_Alkali_ratio,
    R38_total_Alkali,
    S38_Liquid_Phase,
    T38_Coating_Index,
  } = 0.0;

  K38_DOC =
    ((L38_KL_LOI / 100 - V38_LOI / 100) /
      (L38_KL_LOI / 100 - (L38_KL_LOI / 100) * (V38_LOI / 100))) *
    100;
  M38_C3Snet =
    4.07 * (K35_CaO - I38_FCaO) -
    7.6 * H35_SiO2 -
    6.72 * I35_Al2O3 -
    1.43 * J35_Fe2O3 -
    2.85 * O35_SO3;
  N38_C2S = 2.867 * H35_SiO2 - 0.7544 * M38_C3Snet;
  O38_C3A = 2.65 * I35_Al2O3 - 1.693 * J35_Fe2O3;
  P38_C4AF = 3.04 * J35_Fe2O3;
  Q38_Sulfur_Alkali_ratio = 1 / (R38_total_Alkali / 62 / (O35_SO3 / 80));
  R38_total_Alkali = M35_Na2O + 0.658 * N35_K2O;
  S38_Liquid_Phase =
    3 * I35_Al2O3 + 2.25 * J35_Fe2O3 + L35_MgO + M35_Na2O + N35_K2O + O35_SO3;
  T38_Coating_Index = O38_C3A + P38_C4AF + N38_C2S * 0.2 + 2 * J35_Fe2O3;

  //#endregion

  //END NAME: RAWMEAL and CLINKER TARGETS

  //***************************************************** */

  return (
    <ScrollView>
      <Text>RAW MEAL CLICKER TARGET</Text>
    </ScrollView>
  );
};
