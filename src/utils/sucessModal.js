import Swal from 'sweetalert2';

const successModal = (text) => {
    Swal.fire({
        icon: "success",
        title: "Éxito",
        text,
      });
}

export default successModal;