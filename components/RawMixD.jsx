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
} from "react-native";
// import SQLite from "react-native-sqlite-2";
import * as SQLite from "expo-sqlite";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

const RawMixD = () => {
  const [db, setDb] = useState(SQLite.openDatabase("RM.db"));
  const [isLoading, setIsLoading] = useState(true);

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

  //CREATE TABLE IF NOT EXISTS

  const [dataList2, setDataList2] = useState([]);
  //LOAD DATA LIST
  const SavedDataList2 = () => {
    useEffect(() => {
      loadData2();
    }, []);

    const loadData2 = () => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM rmdTable ", [], (_, { rows }) => {
          const items = rows._array;
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

    // db.transaction(tx => {
    //   tx.executeSql('SELECT * FROM rmTable', null,
    //     (txObj, resultSet) => setNames(resultSet.rows._array),
    //     (txObj, error) => console.log(error)
    //   );
    // });

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
          console.log("Rows affected:", rowsAffected);
          alert("Save RMD Complete!");
          setIsLoading(false);
        },
        (_, error) => {
          alert("Save RMD  Error: ", error);
        }
      );
    });
    setTimeout(() => {
      // setIsLoading(false);
    }, 2000);
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
      // setIsLoading(false);
    }, 2000);
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
          alert("Data RMD Loaded!");
          setIsLoading(false);
        }
      );
    });
    console.log("Done loading data!");
    setTimeout(() => {
      // setIsLoading(false);
    }, 2000);
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

    loadall2();
  }
  //END SQLITE

  const compute_G8_MIX_RDFC = () => {
    G8_MIX_RDFC = C8_MIX_RDFC + D8_MIX_RDFC + E8_MIX_RDFC + F8_MIX_RDFC;

    setG8_MIX_RDFC(G8_MIX_RDFC.toFixed(2));
  };

  const compute_G9_SiO2_RDFC = () => {
    G9_SiO2_RDFC =
      (C8_MIX_RDFC * C9_SiO2_RDFC +
        D8_MIX_RDFC * D9_SiO2_RDFC +
        E8_MIX_RDFC * E9_SiO2_RDFC +
        F8_MIX_RDFC * F9_SiO2_RDFC) /
      G8_MIX_RDFC;

    setG9_SiO2_RDFC(G9_SiO2_RDFC.toFixed(2));
  };
  const compute_G11_Fe2O3_RDFC = () => {
    G11_Fe2O3_RDFC =
      (C8_MIX_RDFC * C11_Fe2O3_RDFC +
        D8_MIX_RDFC * D11_Fe2O3_RDFC +
        E8_MIX_RDFC * E11_Fe2O3_RDFC +
        F8_MIX_RDFC * F11_Fe2O3_RDFC) /
      G8_MIX_RDFC;

    setG11_Fe2O3_RDFC(G11_Fe2O3_RDFC.toFixed(2));
  };

  const compute_G12_CaO_RDFC = () => {
    G12_CaO_RDFC =
      (C8_MIX_RDFC * C12_CaO_RDFC +
        D8_MIX_RDFC * D12_CaO_RDFC +
        E8_MIX_RDFC * E12_CaO_RDFC +
        F8_MIX_RDFC * F12_CaO_RDFC) /
      G8_MIX_RDFC;

    setG12_CaO_RDFC(G12_CaO_RDFC.toFixed(2));
  };

  const compute_G13_MgO_RDFC = () => {
    G13_MgO_RDFC =
      (C8_MIX_RDFC * C13_MgO_RDFC +
        D8_MIX_RDFC * D13_MgO_RDFC +
        E8_MIX_RDFC * E13_MgO_RDFC +
        F8_MIX_RDFC * F13_MgO_RDFC) /
      G8_MIX_RDFC;

    setG13_MgO_RDFC(G13_MgO_RDFC.toFixed(2));
  };

  const compute_G14_Na2O_RDFC = () => {
    G14_Na2O_RDFC =
      (C8_MIX_RDFC * C14_Na2O_RDFC +
        D8_MIX_RDFC * D14_Na2O_RDFC +
        E8_MIX_RDFC * E14_Na2O_RDFC +
        F8_MIX_RDFC * F14_Na2O_RDFC) /
      G8_MIX_RDFC;

    setG14_Na2O_RDFC(G14_Na2O_RDFC.toFixed(2));
  };
  const compute_G15_K2O_RDFC = () => {
    G15_K2O_RDFC =
      (C8_MIX_RDFC * C15_K2O_RDFC +
        D8_MIX_RDFC * D15_K2O_RDFC +
        E8_MIX_RDFC * E15_K2O_RDFC +
        F8_MIX_RDFC * F15_K2O_RDFC) /
      G8_MIX_RDFC;

    setG15_K2O_RDFC(G15_K2O_RDFC.toFixed(2));
  };
  const compute_G16_SO3_RDFC = () => {
    G16_SO3_RDFC =
      (C8_MIX_RDFC * C16_SO3_RDFC +
        D8_MIX_RDFC * D16_SO3_RDFC +
        E8_MIX_RDFC * E16_SO3_RDFC +
        F8_MIX_RDFC * F16_SO3_RDFC) /
      G8_MIX_RDFC;

    setG16_SO3_RDFC(G16_SO3_RDFC.toFixed(2));
  };
  const compute_G17_LOI_RDFC = () => {
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
    G19_LSF_RDFC =
      (100 * G12_CaO_RDFC) /
      (2.8 * G9_SiO2_RDFC + 1.18 * G10_Al2O3_RDFC + 0.65 * G11_Fe2O3_RDFC);

    setG19_LSF_RDFC(G19_LSF_RDFC.toFixed(2));
  };
  const compute_G20_SM_RDFC = () => {
    G20_SM_RDFC = G9_SiO2_RDFC / (G10_Al2O3_RDFC + G11_Fe2O3_RDFC);

    setG20_SM_RDFC(G20_SM_RDFC.toFixed(2));
  };
  const compute_G21_AM_RDFC = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      I7_datenow;
    }, 1000);
  }, []);

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
    L13_f = I20_Alumina_Modulus * C11_Fe2O3_RDFC - C10_Al2O3_RDFC;

    setL13_f(L13_f.toFixed(2));
  };

  const compute_L14_g = () => {
    L14_g = I20_Alumina_Modulus * D11_Fe2O3_RDFC - D10_Al2O3_RDFC;

    setL14_g(L14_g.toFixed(2));
  };

  const compute_L15_h = () => {
    L15_h = I20_Alumina_Modulus * E11_Fe2O3_RDFC - E10_Al2O3_RDFC;

    setL15_h(L15_h.toFixed(2));
  };
  const compute_L16_i = () => {
    L16_i = I20_Alumina_Modulus * F11_Fe2O3_RDFC - F10_Al2O3_RDFC;

    setL16_i(L16_i.toFixed(2));
  };

  const compute_L17_k = () => {
    L17_k =
      I17_Silica_Modulus * C10_Al2O3_RDFC +
      I17_Silica_Modulus * C11_Fe2O3_RDFC -
      C9_SiO2_RDFC;

    setL17_k(L17_k.toFixed(2));
  };
  const compute_L18_l = () => {
    L18_l =
      I17_Silica_Modulus * D10_Al2O3_RDFC +
      I17_Silica_Modulus * D11_Fe2O3_RDFC -
      D9_SiO2_RDFC;

    setL18_l(L18_l.toFixed(2));
  };
  const compute_L19_m = () => {
    L19_m =
      I17_Silica_Modulus * E10_Al2O3_RDFC +
      I17_Silica_Modulus * E11_Fe2O3_RDFC -
      E9_SiO2_RDFC;

    setL19_m(L19_m.toFixed(2));
  };
  const compute_L20_n = () => {
    L20_n =
      I17_Silica_Modulus * F10_Al2O3_RDFC +
      I17_Silica_Modulus * F11_Fe2O3_RDFC -
      F9_SiO2_RDFC;

    setL20_n(L20_n.toFixed(2));
  };
  const compute_L21_p = () => {
    L21_p =
      I14_Lime_Saturation * 2.8 * C9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * C10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * C11_Fe2O3_RDFC -
      100 * C12_CaO_RDFC;

    setL21_p(L21_p.toFixed(2));
  };
  const compute_L22_q = () => {
    L22_q =
      I14_Lime_Saturation * 2.8 * D9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * D10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * D11_Fe2O3_RDFC -
      100 * D12_CaO_RDFC;

    setL22_q(L22_q.toFixed(2));
  };
  const compute_L23_r = () => {
    L23_r =
      I14_Lime_Saturation * 2.8 * E9_SiO2_RDFC +
      I14_Lime_Saturation * 1.18 * E10_Al2O3_RDFC +
      I14_Lime_Saturation * 0.65 * E11_Fe2O3_RDFC -
      100 * E12_CaO_RDFC;

    setL23_r(L23_r.toFixed(2));
  };
  const compute_L24_s = () => {
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
    O15_W = O8_Dw_Matrix / O12_D_Matrix;

    setO15_W(O15_W.toFixed(2));
  };
  const compute_O16_X = () => {
    O16_X = O9_Dx_Matrix / O12_D_Matrix;

    setO16_X(O16_X.toFixed(2));
  };
  const compute_O17_Y = () => {
    O17_Y = O10_Dy_Matrix / O12_D_Matrix;

    setO17_Y(O17_Y.toFixed(2));
  };
  const compute_O18_Z = () => {
    O18_Z = O11_Dz_Matrix / O12_D_Matrix;

    setO18_Z(O18_Z.toFixed(2));
  };
  const compute_O19_TOTAL = () => {
    O19_TOTAL = O15_W + O16_X + O17_Y + O18_Z;

    setO19_TOTAL(O19_TOTAL.toFixed(2));
  };

  function emptyinput2() {
    setC8_MIX_RDFC("");
    setC9_SiO2_RDFC("");
    setC10_Al2O3_RDFC("");
    setC11_Fe2O3_RDFC("");
    setC12_CaO_RDFC("");
    setC13_MgO_RDFC("");
    setC14_Na2O_RDFC("");
    setC15_K2O_RDFC("");
    setC16_SO3_RDFC("");
    setC17_LOI_RDFC("");
    setC18_TOTAL_RDFC("");
    setC19_LSF_RDFC("");
    setC20_SM_RDFC("");
    setC21_AM_RDFC("");
    setD8_MIX_RDFC("");
    setD9_SiO2_RDFC("");
    setD10_Al2O3_RDFC("");
    setD11_Fe2O3_RDFC("");
    setD12_CaO_RDFC("");
    setD13_MgO_RDFC("");
    setD14_Na2O_RDFC("");
    setD15_K2O_RDFC("");
    setD16_SO3_RDFC("");
    setD17_LOI_RDFC("");
    setD18_TOTAL_RDFC("");
    setD19_LSF_RDFC("");
    setD20_SM_RDFC("");
    setD21_AM_RDFC("");
    setE8_MIX_RDFC("");
    setE9_SiO2_RDFC("");
    setE10_Al2O3_RDFC("");
    setE11_Fe2O3_RDFC("");
    setE12_CaO_RDFC("");
    setE13_MgO_RDFC("");
    setE14_Na2O_RDFC("");
    setE15_K2O_RDFC("");
    setE16_SO3_RDFC("");
    setE17_LOI_RDFC("");
    setE18_TOTAL_RDFC("");
    setE19_LSF_RDFC("");
    setE20_SM_RDFC("");
    setE21_AM_RDFC("");
    setF8_MIX_RDFC("");
    setF9_SiO2_RDFC("");
    setF10_Al2O3_RDFC("");
    setF11_Fe2O3_RDFC("");
    setF12_CaO_RDFC("");
    setF13_MgO_RDFC("");
    setF14_Na2O_RDFC("");
    setF15_K2O_RDFC("");
    setF16_SO3_RDFC("");
    setF17_LOI_RDFC("");
    setF18_TOTAL_RDFC("");
    setF19_LSF_RDFC("");
    setF20_SM_RDFC("");
    setF21_AM_RDFC("");
    setG8_MIX_RDFC("");
    setG9_SiO2_RDFC("");
    setG10_Al2O3_RDFC("");
    setG11_Fe2O3_RDFC("");
    setG12_CaO_RDFC("");
    setG13_MgO_RDFC("");
    setG14_Na2O_RDFC("");
    setG15_K2O_RDFC("");
    setG16_SO3_RDFC("");
    setG17_LOI_RDFC("");
    setG18_TOTAL_RDFC("");
    setG19_LSF_RDFC("");
    setG20_SM_RDFC("");
    setG21_AM_RDFC("");
    setI14_Lime_Saturation("");
    setI17_Silica_Modulus("");
    setI20_Alumina_Modulus("");
    setL8_a("");
    setL9_b("");
    setL10_c("");
    setL11_d("");
    setL12_e("");
    setL13_f("");
    setL14_g("");
    setL15_h("");
    setL16_i("");
    setL17_k("");
    setL18_l("");
    setL19_m("");
    setL20_n("");
    setL21_p("");
    setL22_q("");
    setL23_r("");
    setL24_s("");
    setO8_Dw_Matrix("");
    setO9_Dx_Matrix("");
    setO10_Dy_Matrix("");
    setO11_Dz_Matrix("");
    setO12_D_Matrix("");
    setO15_W("");
    setO16_X("");
    setO17_Y("");
    setO18_Z("");
    setO19_TOTAL("");
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
    I7_datenow();
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
  }

  //END functions and formulas

  return (
    <View>
      <Text style={{ fontSize: 14, marginTop: 15, backgroundColor: "green" }}>
        ' - - - - - - - - - RAWMIX D By Four Components - - - - - - - - -{" "}
      </Text>
      <View>
        <Text>DATE & TIME: {I7_Date}</Text>
        <View style={styles.container}>
          {/* <TextInput value={currentName} placeholder='name' onChangeText={setCurrentName} /> */}

          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            // <SaveModal />
            <Button title="Save RMD Data " onPress={addData2} />
          )}

          <Button title="Clear" onPress={emptyinput2} />
          {/* {showNames()} */}
          {/* <Button title="Export Db" onPress={exportDb} />
            <Button title="Import Db" onPress={importDb} /> */}
          <StatusBar style="auto" />
        </View>
        {/* table saved list */}
        <View>
          <SavedDataList2 />
        </View>
        <View>
          {dataList2.map((item) => (
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
                    title="Delete RMD"
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
                    title="Update RMD"
                    onPress={() => {
                      updateData2(item.id);
                    }}
                  />
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.table_head}>
          <View style={{ width: "15%" }}>
            <View>
              <Text></Text>
            </View>
          </View>
          <View style={{ width: "20%" }}>
            <Text>LIMESTONE</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text>SHALE</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text>SAND</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text>IRON ORE</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text>RAWMEAL</Text>
          </View>
        </View>

        <View style={styles.table_body}>
          <View style={{ width: "15%", fontSize: 16 }}>
            <Text style={styles.table_column_vertical}>MIX %</Text>
            <Text style={styles.table_column_vertical}>SiO2</Text>
            <Text style={styles.table_column_vertical}>Al2O3</Text>
            <Text style={styles.table_column_vertical}>Fe2O3</Text>
            <Text style={styles.table_column_vertical}>CaO</Text>
            <Text style={styles.table_column_vertical}>MgO</Text>
            <Text style={styles.table_column_vertical}>Na2O</Text>
            <Text style={styles.table_column_vertical}>K2O</Text>
            <Text style={styles.table_column_vertical}>SO3</Text>
            <Text style={styles.table_column_vertical}>LOI</Text>
            <Text style={styles.table_column_vertical}>TOTAL</Text>
            <Text style={styles.table_column_vertical}>LSF</Text>
            <Text style={styles.table_column_vertical}>SM</Text>
            <Text style={styles.table_column_vertical}>AM</Text>
          </View>

          {/* Table Body */}
          <View style={{ width: "20%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC8_MIX_RDFC(text)}
              value={C8_MIX_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC9_SiO2_RDFC(text)}
              value={C9_SiO2_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC10_Al2O3_RDFC(text)}
              value={C10_Al2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC11_Fe2O3_RDFC(text)}
              value={C11_Fe2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC12_CaO_RDFC(text)}
              value={C12_CaO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC13_MgO_RDFC(text)}
              value={C13_MgO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC14_Na2O_RDFC(text)}
              value={C14_Na2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC15_K2O_RDFC(text)}
              value={C15_K2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC16_SO3_RDFC(text)}
              value={C16_SO3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setC17_LOI_RDFC(text)}
              value={C17_LOI_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <Text style={styles.table_nw_yellow}>{C18_TOTAL_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{C19_LSF_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{C20_SM_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{C21_AM_RDFC}</Text>
          </View>

          {/* Table Body */}
          <View style={{ width: "15%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD8_MIX_RDFC(text)}
              value={D8_MIX_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD9_SiO2_RDFC(text)}
              value={D9_SiO2_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD10_Al2O3_RDFC(text)}
              value={D10_Al2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD11_Fe2O3_RDFC(text)}
              value={D11_Fe2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD12_CaO_RDFC(text)}
              value={D12_CaO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD13_MgO_RDFC(text)}
              value={D13_MgO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD14_Na2O_RDFC(text)}
              value={D14_Na2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD15_K2O_RDFC(text)}
              value={D15_K2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD16_SO3_RDFC(text)}
              value={D16_SO3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setD17_LOI_RDFC(text)}
              value={D17_LOI_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <Text style={styles.table_nw_yellow}>{D18_TOTAL_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{D19_LSF_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{D20_SM_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{D21_AM_RDFC}</Text>
          </View>
          {/* Table Body */}
          <View style={{ width: "15%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE8_MIX_RDFC(text)}
              value={E8_MIX_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE9_SiO2_RDFC(text)}
              value={E9_SiO2_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE10_Al2O3_RDFC(text)}
              value={E10_Al2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE11_Fe2O3_RDFC(text)}
              value={E11_Fe2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE12_CaO_RDFC(text)}
              value={E12_CaO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE13_MgO_RDFC(text)}
              value={E13_MgO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE14_Na2O_RDFC(text)}
              value={E14_Na2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE15_K2O_RDFC(text)}
              value={E15_K2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE16_SO3_RDFC(text)}
              value={E16_SO3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setE17_LOI_RDFC(text)}
              value={E17_LOI_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <Text style={styles.table_nw_yellow}>{E18_TOTAL_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{E19_LSF_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{E20_SM_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{E21_AM_RDFC}</Text>
          </View>

          <View style={{ width: "15%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF8_MIX_RDFC(text)}
              value={F8_MIX_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF9_SiO2_RDFC(text)}
              value={F9_SiO2_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF10_Al2O3_RDFC(text)}
              value={F10_Al2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF11_Fe2O3_RDFC(text)}
              value={F11_Fe2O3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF12_CaO_RDFC(text)}
              value={F12_CaO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF13_MgO_RDFC(text)}
              value={F13_MgO_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF14_Na2O_RDFC(text)}
              value={F14_Na2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF15_K2O_RDFC(text)}
              value={F15_K2O_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF16_SO3_RDFC(text)}
              value={F16_SO3_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setF17_LOI_RDFC(text)}
              value={F17_LOI_RDFC.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
            <Text style={styles.table_nw_yellow}>{F18_TOTAL_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{F19_LSF_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{F20_SM_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{F21_AM_RDFC}</Text>
          </View>
          {/* Table Body */}
          <View style={{ width: "20%" }}>
            <Text style={styles.table_nw_yellow}>{G8_MIX_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G9_SiO2_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G10_Al2O3_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G11_Fe2O3_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G12_CaO_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G13_MgO_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G14_Na2O_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G15_K2O_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G16_SO3_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G17_LOI_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G18_TOTAL_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G19_LSF_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G20_SM_RDFC}</Text>
            <Text style={styles.table_nw_yellow}>{G21_AM_RDFC}</Text>
          </View>
        </View>

        <View>
          <View style={styles.table_head}>
            <Text>RAWMEAL TARGETS</Text>
          </View>
          <View style={styles.table_head}>
            <View style={{ width: "35%" }}>
              <Text>Lime Saturation</Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text>Silica Modulus</Text>
            </View>
            <View style={{ width: "35%" }}>
              <Text>Alumina Modulus</Text>
            </View>
          </View>
        </View>
        <View style={styles.table_body}>
          <View style={{ width: "35%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setI14_Lime_Saturation(text)}
              value={I14_Lime_Saturation.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
          </View>
          <View style={{ width: "30%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setI17_Silica_Modulus(text)}
              value={I17_Silica_Modulus.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
          </View>
          <View style={{ width: "35%" }}>
            <TextInput
              style={styles.table_data}
              onChangeText={(text) => setI20_Alumina_Modulus(text)}
              value={I20_Alumina_Modulus.toString()}
              keyboardType="numeric"
              placeholder="Input here..."
              onSubmitEditing={loadall2}
              onFocus={emptyinput2}
            ></TextInput>
          </View>
        </View>
      </View>

      {/* Table Body */}
      {/* XRF Analysis */}
      {/* 1 */}

      <View style={styles.table_head}>
        <Text>COEFFICIENTS</Text>
      </View>
      <View style={styles.table_body}>
        <View style={{ width: "50%" }}>
          <Text style={styles.table_column_vertical}>a</Text>
          <Text style={styles.table_column_vertical}>b</Text>
          <Text style={styles.table_column_vertical}>c</Text>
          <Text style={styles.table_column_vertical}>d</Text>
          <Text style={styles.table_column_vertical}>e</Text>
          <Text style={styles.table_column_vertical}>f</Text>
          <Text style={styles.table_column_vertical}>g</Text>
          <Text style={styles.table_column_vertical}>h</Text>
          <Text style={styles.table_column_vertical}>i</Text>
          <Text style={styles.table_column_vertical}>k</Text>
          <Text style={styles.table_column_vertical}>l</Text>
          <Text style={styles.table_column_vertical}>m</Text>
          <Text style={styles.table_column_vertical}>n</Text>
          <Text style={styles.table_column_vertical}>p</Text>
          <Text style={styles.table_column_vertical}>q</Text>
          <Text style={styles.table_column_vertical}>r</Text>
          <Text style={styles.table_column_vertical}>s</Text>
        </View>

        <View style={{ width: "50%" }}>
          {/* Yellow */}
          <Text style={styles.table_nw_yellow}>{L8_a}</Text>
          <Text style={styles.table_nw_yellow}>{L9_b}</Text>
          <Text style={styles.table_nw_yellow}>{L10_c}</Text>
          <Text style={styles.table_nw_yellow}>{L11_d}</Text>
          <Text style={styles.table_nw_yellow}>{L12_e}</Text>
          <Text style={styles.table_nw_yellow}>{L13_f}</Text>
          <Text style={styles.table_nw_yellow}>{L14_g}</Text>
          <Text style={styles.table_nw_yellow}>{L15_h}</Text>
          <Text style={styles.table_nw_yellow}>{L16_i}</Text>
          <Text style={styles.table_nw_yellow}>{L17_k}</Text>
          <Text style={styles.table_nw_yellow}>{L18_l}</Text>
          <Text style={styles.table_nw_yellow}>{L19_m}</Text>
          <Text style={styles.table_nw_yellow}>{L20_n}</Text>
          <Text style={styles.table_nw_yellow}>{L21_p}</Text>
          <Text style={styles.table_nw_yellow}>{L22_q}</Text>
          <Text style={styles.table_nw_yellow}>{L23_r}</Text>
          <Text style={styles.table_nw_yellow}>{L24_s}</Text>
        </View>
      </View>

      <View style={styles.table_head}>
        <Text>MATRIX DETERMINANTS</Text>
      </View>
      <View style={styles.table_body}>
        <View style={{ width: "50%" }}>
          <Text style={styles.table_column_vertical}>Dw</Text>
          <Text style={styles.table_column_vertical}>Dx</Text>
          <Text style={styles.table_column_vertical}>Dy</Text>
          <Text style={styles.table_column_vertical}>Dz</Text>
          <Text style={styles.table_column_vertical}>D</Text>
        </View>

        <View style={{ width: "50%" }}>
          {/* Yellow */}
          <Text style={styles.table_nw_yellow}>{O8_Dw_Matrix}</Text>
          <Text style={styles.table_nw_yellow}>{O9_Dx_Matrix}</Text>
          <Text style={styles.table_nw_yellow}>{O10_Dy_Matrix}</Text>
          <Text style={styles.table_nw_yellow}>{O11_Dz_Matrix}</Text>
          <Text style={styles.table_nw_yellow}>{O12_D_Matrix}</Text>
        </View>
      </View>

      <View style={styles.table_head}>
        <Text> RAW MATERIALS %</Text>
      </View>
      <View style={styles.table_head}>
        <Text>MATRIX DETERMINANTS</Text>
      </View>
      <View style={styles.table_body}>
        <View style={{ width: "50%" }}>
          <Text style={styles.table_column_vertical}>W (LST)</Text>
          <Text style={styles.table_column_vertical}>X (SHL)</Text>
          <Text style={styles.table_column_vertical}>Y (SIL)</Text>
          <Text style={styles.table_column_vertical}>Z (FE)</Text>
          <Text style={styles.table_column_vertical}>TOTAL</Text>
        </View>

        <View style={{ width: "50%" }}>
          {/* Yellow */}
          <Text style={styles.table_nw_yellow}>{L8_a}</Text>
          <Text style={styles.table_nw_yellow}>{L9_b}</Text>
          <Text style={styles.table_nw_yellow}>{L10_c}</Text>
          <Text style={styles.table_nw_yellow}>{L11_d}</Text>
          <Text style={styles.table_nw_yellow}>{L12_e}</Text>
        </View>
      </View>
    </View>
  );
};

export default RawMixD;

const styles = StyleSheet.create({
  wrapper: {
    justifycontent: "stretch",
    alignItems: "stretch",
    flex: 1,
    marginTop: 25,
  },
  table: {
    margin: 15,
  },
  table_head: {
    flexDirection: "row",
    backgroundColor: "skyblue",
    padding: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  table_body: {
    flexDirection: "row",
  },
  table_caption: {
    fontWeight: "bold",
  },
  table_data: {
    fontSize: 14,
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 1,
    marginLeft: 5,
  },
  table_data_yellow: {
    fontSize: 16,
    backgroundColor: "yellow",
  },
  table_column_vertical: {
    fontSize: 14,
    marginTop: 11,
  },

  table_ver_data: {
    justifyContent: "flex-start",
    fontSize: 11,
    borderColor: "green",
    borderWidth: 1,
    width: 50,
    padding: 0,
    margin: 0,
  },
  table_avg: {
    fontSize: 16,
  },
  table_nw_yellow: {
    fontSize: 16,
    backgroundColor: "yellow",
    fontSize: 14,
    marginTop: 11,
    marginRight: 11,
  },
  buttoncontainer: {
    position: "relative",
    bottom: 16,
    right: 16,
    marginTop: 30,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
