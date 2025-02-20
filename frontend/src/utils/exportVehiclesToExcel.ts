import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { VehicleData } from "../types/vehicleData";

export const exportVehiclesToExcel = (vehicles: VehicleData[]) => {
  // Création d'une feuille de calcul Excel avec toutes les données
  const ws = XLSX.utils.json_to_sheet(
    vehicles.map((v) => ({
      ID: v.id || "",
      Marque: v.brand,
      Modèle: v.model,
      Version: v.version,
      Couleur: v.color,
      VIN: v.vin,
      "ID Interne": v.internalId,
      Kilométrage: v.mileage,
      "Plaque d'immatriculation": v.licensePlate,
      "Frais (€)": v.fees,
      "Prix (€)": v.price,
      "Prix d'achat (€)": v.purchasePrice,
      "En Location": v.isRental ? "Oui" : "Non",
      Options: Array.isArray(v.options)
        ? v.options.map((opt) => opt.name).join(", ")
        : "",
      État: v.condition === "new" ? "Neuf" : "Occasion",
      Disponible: v.available ? "Oui" : "Non",
      "Ajouté le": v.addedAt ? new Date(v.addedAt).toLocaleDateString() : "",
    }))
  );

  // Création du classeur Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Véhicules");

  // Génération du fichier Excel
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  // Téléchargement du fichier
  saveAs(data, `vehicules_${new Date().toISOString().split("T")[0]}.xlsx`);
};
