import React, { useState } from 'react';
import { VehicleData } from '../../types/vehicleData';

interface AddVehiclesFormProps {
  onSubmit: (data: VehicleData) => Promise<void>;
  onCancel: () => void;
}

const AddVehiclesForm: React.FC<AddVehiclesFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<VehicleData>({
    brand: '',
    model: '',
    version: '',
    color: '',
    vin: '',
    internalId: '',
    mileage: 0,
    licensePlate: '',
    fees: 0,
    price: 0,
    purchasePrice: 0,
    img: '',
    isRental: false,
    options: [],
    condition: 'used',
    available: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { id, addedAt, ...rest } = formData;

      const dataToSubmit = {
        ...rest,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        fees: Number(formData.fees),
        purchasePrice: Number(formData.purchasePrice),
        options: formData.options.map((option) => ({
          name: typeof option === 'string' ? option : option.name,
        })),
      };

      console.log(
        'Données exactes envoyées au serveur:',
        JSON.stringify(dataToSubmit, null, 2),
      );
      await onSubmit(dataToSubmit);
    } catch (error) {
      console.error('Erreur détaillée:', error);
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Marque
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Modèle
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Version
          </label>
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Couleur
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numéro VIN
          </label>
          <input
            type="text"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matricule
          </label>
          <input
            type="text"
            name="internalId"
            value={formData.internalId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kilométrage
          </label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Immatriculation
          </label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frais
          </label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix d'achat
          </label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            État
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="new">Neuf</option>
            <option value="used">Occasion</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Options
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={typeof option === 'string' ? option : option.name}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = { name: e.target.value };
                    setFormData((prev) => ({ ...prev, options: newOptions }));
                  }}
                  className="px-2 py-1 border rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      options: prev.options.filter((_, i) => i !== index),
                    }));
                  }}
                  className="text-red-500"
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
                  options: [...prev.options, { name: '' }],
                }));
              }}
              className="px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
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
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          disabled={isSubmitting}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ajout en cours...' : 'Ajouter le véhicule'}
        </button>
      </div>
    </form>
  );
};

export default AddVehiclesForm;
