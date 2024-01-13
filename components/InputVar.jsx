import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const InputVar = () => {
  //***************************************************** */

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

  //END NAME: INPUT VARIABLES

  //***************************************************** */

  //START Javascript Method

  //#region
  // begin total_C15
  const [result_total_C15, setResult_total_C15] = useState(0);

  const compute_total_C15 = () => {
    D15 = isNaN(parseFloat(D15)) ? 0.0 : parseFloat(D15);
    E15 = isNaN(parseFloat(E15)) ? 0.0 : parseFloat(E15);
    F15 = isNaN(parseFloat(F15)) ? 0.0 : parseFloat(F15);
    G15 = isNaN(parseFloat(G15)) ? 0.0 : parseFloat(G15);

    total_C15 = D15 + E15 + F15 + G15;
    setResult_total_C15(total_C15.toFixed(2));
  };
  // end total_C15
  //#endregion

  useEffect(() => {
    const interval = setInterval(() => {
      // Function to run in the auto-loop
      // Call your desired function here
    }, 2000); // Interval in milliseconds (e.g., 1000ms = 1 second)

    return () => {
      // Cleanup function to clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []);

  function loadall() {}

  //Tap to call
  const handleTap = () => {
    loadall();
  };

  //End Tap to call

  //END Javascript Method

  //Component Table
  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={styles.wrapper}>
        {/* Table Container */}

        <Text style={{ textAlign: "center", backgroundColor: "orange" }}>
          Input Variable
        </Text>
        {/* MPriority */}

        <View>
          <ScrollView style={{ flexGrow: 1, backgroundColor: "transparent" }}>
            <View style={styles.table_head}>
              <Text>Priority</Text>
            </View>

            {/* Table Body */}
            <View style={styles.table_body}>
              <View style={{ width: "20%" }}>
                <Text style={styles.table_column_vertical}>LSF</Text>
                <Text style={styles.table_column_vertical}>SM</Text>
                <Text style={styles.table_column_vertical}>AM</Text>
              </View>

              {/* Table Body */}
              {/* XRF Analysis */}
              {/* 1 */}
              <View style={{ width: "20%" }}>
                <TextInput
                  style={styles.table_data}
                  onChangeText={(text) => setC30_LSF_PR(text)}
                  value={C30_LSF_PR}
                  keyboardType="numeric"
                  placeholder="Input here..."
                  onSubmitEditing={loadall}
                ></TextInput>
                <TextInput
                  style={styles.table_data}
                  onChangeText={(text) => setC31_SM_PR(text)}
                  value={C31_SM_PR}
                  keyboardType="numeric"
                  placeholder="Input here..."
                  onSubmitEditing={loadall}
                ></TextInput>
                <TextInput
                  style={styles.table_data}
                  onChangeText={(text) => setC32_AM_PR(text)}
                  value={C32_AM_PR}
                  keyboardType="numeric"
                  placeholder="Input here..."
                  onSubmitEditing={loadall}
                ></TextInput>
              </View>
            </View>

            {/* Target */}
            <View style={styles.table_head}>
              <Text>Target</Text>
            </View>

            {/* Table Body */}
            <View style={styles.table_body}>
              <View style={{ width: "20%" }}>
                <Text style={styles.table_column_vertical}>LSF</Text>
                <Text style={styles.table_column_vertical}>SM</Text>
                <Text style={styles.table_column_vertical}>AM</Text>
              </View>

              {/* Table Body */}
              {/* XRF Analysis */}
              {/* 1 */}
              <View style={{ width: "20%" }}>
                <TextInput
                  style={styles.table_data}
                  onChangeText={(text) => setF30_LSF_TG(text)}
                  value={F30_LSF_TG}
                  keyboardType="numeric"
                  placeholder="Input here..."
                  onSubmitEditing={loadall}
                ></TextInput>
                <TextInput
                  style={styles.table_data}
                  onChangeText={(text) => setF31_SM_TG(text)}
                  value={F31_SM_TG}
                  keyboardType="numeric"
                  placeholder="Input here..."
                  onSubmitEditing={loadall}
                ></TextInput>
                <TextInput
                  style={styles.table_data}
                  onChangeText={(text) => setF32_AM_TG(text)}
                  value={F32_AM_TG}
                  keyboardType="numeric"
                  placeholder="Input here..."
                  onSubmitEditing={loadall}
                ></TextInput>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputVar;

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
});
