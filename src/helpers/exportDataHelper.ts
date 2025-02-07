import axiosInstance from "../config/axiosConfig";

export const exportCsv = async (username: string) => {
  try {
    const csv = await axiosInstance.get("/export-data", {
      responseType: "blob",
    });

    const url = URL.createObjectURL(new Blob([csv.data], { type: "text/csv" }));
    const downloadLink = Object.assign(document.createElement("a"), {
      href: url,
      download: `${username} - Climb Harder_data.csv`,
    });

    downloadLink.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting data:", error);
  }
};
