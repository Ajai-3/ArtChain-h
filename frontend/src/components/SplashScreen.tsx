export const SplashScreen = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff", // Match your app's background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    {/* Add your logo or loading spinner here */}
    <div>Loading...</div>
  </div>
);
