export const getUserById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  