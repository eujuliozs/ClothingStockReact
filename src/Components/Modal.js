import React from 'react';
import styles from "./Modal.module.css"

export default function Modal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h3>Confirmar Deleção</h3>
        <p>Você tem certeza que deseja deletar este item?</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

