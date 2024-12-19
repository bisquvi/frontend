import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Kullanıcı çıkış yaptı!");
    navigate('/');
  }, [navigate]);

  return (
    <div>
      {/* Boş sayfa, sadece yönlendirme ve log işlemi */}
    </div>
  );
}

export default Logout;
