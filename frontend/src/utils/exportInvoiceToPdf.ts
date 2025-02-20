import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-toastify';


export const generateInvoice = (transaction: any) => {
  if (!transaction) return;

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Facture de Transaction', 14, 20);
  doc.setFontSize(12);
  doc.text(`Transaction #${transaction.id}`, 14, 30);
  doc.text(`Date: ${new Date(transaction.transactionDate).toLocaleDateString('fr-FR')}`, 14, 40);
  doc.text(`Type: ${transaction.transactionType === 'purchase' ? 'Achat' : 'Vente'}`, 14, 50);

  autoTable(doc, {
    startY: 60,
    head: [['Détails', 'Valeur']],
    body: [
      ['Montant', `${transaction.amount.toLocaleString('fr-FR')} €`],
      ['Client', `${transaction.user.firstName} ${transaction.user.lastName}`],
      ['Email', transaction.user.email],
      ['Téléphone', transaction.user.phoneNumber],
      ['Adresse', transaction.user.address],
      ['Véhicule', `${transaction.vehicle.brand} ${transaction.vehicle.model}`],
    ],
  });

  doc.save(`facture_transaction_${transaction.id}.pdf`);

  toast.success('📄 Facture générée avec succès !');
};
