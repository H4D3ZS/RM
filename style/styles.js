import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
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
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
  },
  table_caption: {
    fontWeight: "bold",
  },
  table_data: {
    position: "relative",
    fontSize: 12,
    borderRadius: 3,
    borderColor: "green",
    borderWidth: 1,
    width: 50,
    paddingTop: 2,
  },

  table_column_vertical: {
    fontSize: 12,
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
    fontSize: 12,
  },
  table_nw_yellow: {
    fontSize: 12,
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
  switch: {
    display: "flex",
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust the scale values as needed
  },
  text: {
    marginRight: 8,
  },
  table_data_yellow: {
    fontSize: 12,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    marginRight: 0,
    backgroundColor: "yellow",
  },
  table_head_vertical: {
    fontSize: 12,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    marginRight: 0,
  },
  switch_con: {
    flexDirection: "row",
    alignItems: "center",
    margin: 2,
    padding: 2,
  },
  switch_content: {
    flexDirection: "row",
  },
  switch_text: {
    position: "relative",
    padding: 9,
    display: "flex",
    fontSize: 10,
  },
  switch_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  page: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    flex: 1,
    position: "relative",
    backgroundColor: "red",
    padding: "100%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    position: "relative",
    backgroundColor: "blue",
    padding: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    marginVertical: 10,
  },
  switchtext_align: {
    alignItems: "center",
    marginTop: 1,
  },
});

export default styles;
