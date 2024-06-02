import Swal from 'sweetalert2';

const genericErrorModal = () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error con el servidor! Si el problema persiste contacta al desarrollador",
      });
}

export const errorModal = (error) => {
  Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
}

export default genericErrorModal;