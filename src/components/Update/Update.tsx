import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../types";
import { updateUser } from "../../services/usersService";
import styles from "./Update.module.css";

const Update: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user: User | undefined = location.state?.user;

    const [id, setId] = useState<string>(user?._id || ""); // Asegúrate de que sea un string
    const [name, setName] = useState(user?.name || "");
    const [age, setAge] = useState(user?.age || 0);
    const [email, setEmail] = useState(user?.email || "");

    if (!user) {
        return <div>No se encontró información del usuario</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedUser: User = {
            ...user,
            name,
            age,
            email,
        };

        try {
            console.log('Usuario a actualizar:', updatedUser);
            const result = await updateUser(updatedUser);
            console.log('Usuario actualizado:', result);

            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            alert('Hubo un problema al actualizar el usuario.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Actualizar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nombre:</label>
                    <input
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Edad:</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        type="email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Guardar cambios
                </button>
            </form>
        </div>
    );
};

export default Update;
