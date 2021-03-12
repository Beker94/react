

export const selectStyle:any = {
  menu: () => {
    return {
      backgroundColor: "#232323;",
      position: "absolute",
      margin: "20px",
      marginTop: "0",
      display: "block",
      width: "330px",
      top: "48px",
      borderRadius: "3px",
    };
  },
  option: () => {
    return {
      ":hover": {
        backgroundColor: "#f65261;",
      },
    };
  },
  control: () => {
    return {
      backgroundColor: "#555",
      margin: "20px",
      border: "none",
      height: "26px",
      borderRadius: "3px",
      color: "white",
      display: "flex",
    };
  },
};
