import * as XLSX from "xlsx";
import { VehicleData, Condition } from "../types/vehicleData";

export const importVehiclesFromExcel = async (file: File): Promise<VehicleData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

        const vehicles: VehicleData[] = jsonData.map((row) => {
          let addedAt: string;
          const rawDate = row["Ajouté le"];
          if (rawDate) {
            const parsedDate = new Date(rawDate);
            addedAt = isNaN(parsedDate.getTime())
              ? new Date().toISOString()
              : parsedDate.toISOString();
          } else {
            addedAt = new Date().toISOString();
          }

          return {
            brand: row["Marque"] || "",
            model: row["Modèle"] || "",
            version: row["Version"] || "",
            color: row["Couleur"] || "",
            vin: row["VIN"] || "",
            internalId: row["ID Interne"] || "",
            mileage: parseInt(row["Kilométrage"], 10) || 0,
            licensePlate: row["Plaque d'immatriculation"] || "",
            fees: parseFloat(row["Frais (€)"]) || 0,
            price: parseFloat(row["Prix (€)"]) || 0,
            purchasePrice: parseFloat(row["Prix d'achat (€)"]) || 0,
            img: row["Img"] || "",
            isRental: row["En Location"] === "Oui",
            options: row["Options"]
              ? row["Options"].split(",").map((opt: string) => ({ name: opt.trim() }))
              : [],
            condition: (row["État"]?.toLowerCase() === "neuf" ? "new" : "used") as Condition,
            available: row["Disponible"] === "Oui",
            addedAt,
          };
        });

        resolve(vehicles);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
