import React, { useState } from 'react';
import { VehicleData } from '../../types/vehicleData';

interface EditVehiclesFormProps {
  vehicle: VehicleData;
  onSubmit: (data: VehicleData) => void;
  onCancel: () => void;
}

const EditVehiclesForm: React.FC<EditVehiclesFormProps> = ({
  vehicle,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<VehicleData>({
    ...vehicle,
    options: vehicle.options || [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        fees: Number(formData.fees),
        purchasePrice: Number(formData.purchasePrice),
        options: formData.options.map((option) => ({
          name: option.name,
        })),
      };

      // Log détaillé
      console.log('Données brutes:', formData);
      console.log('Données formatées:', dataToSubmit);
      console.log('Options formatées:', dataToSubmit.options);

      await onSubmit(dataToSubmit);
    } catch (error) {
      console.error('Erreur complète:', error);
      console.error('URL appelée:', `/vehicle/${formData.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marque
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Modèle
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Version
          </label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Couleur
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Numéro VIN
          </label>
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Matricule
          </label>
          <input
            type="text"
            name="internalId"
            value={formData.internalId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kilométrage
          </label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Immatriculation
          </label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frais
          </label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            État
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="new">Neuf</option>
            <option value="used">Occasion</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="checkbox"
            name="isRental"
            checked={formData.isRental}
            onChange={handleChange}
            className="mt-2"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options du véhicule
          </label>
          <div className="flex flex-wrap gap-2 p-4 border rounded-lg">
            {formData.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white p-2 rounded shadow-sm"
              >
                <input
                  type="text"
                  value={option.name}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = {
                      ...newOptions[index],
                      name: e.target.value,
                    };
                    setFormData((prev) => ({ ...prev, options: newOptions }));
                  }}
                  className="px-2 py-1 border rounded text-sm"
                  placeholder="Nom de l'option"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      options: prev.options.filter((_, i) => i !== index),
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  options: [
                    ...prev.options,
                    { name: '' }, // Simplifié pour correspondre au type attendu
                  ],
                }));
              }}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm"
            >
              + Ajouter une option
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
};

export default EditVehiclesForm;
