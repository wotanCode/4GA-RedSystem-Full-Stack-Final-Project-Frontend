import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/app.scss";
import { Listastotal } from "../component/listastotal.js";
//react-bootstrap
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//Importamos la libreria axios previamente instalada
import axios from "axios";
//Aqui colocar la URL de la API por favor
import { URL } from "../config";
import { Context } from "../store/appContext";

export const Ordenes = props => {
	const { store, actions } = useContext(Context);
	//Generamos primero el uso de useState
	const [ordenes, setOrdenes] = useState([]);
	const { id } = useParams();

	const fetchOrdenes = useCallback(
		async () => {
			try {
				const { data } = await axios.get(`${URL}orders/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				});
				// console.log("users", data.Lista_de_usuarios);
				setOrdenes(data);
			} catch (error) {
				console.error(error);
				alert("Error en la api: No se pudo recibir la lista de Ordenes");
			}
		},
		[setOrdenes]
	);

	useEffect(
		() => {
			fetchOrdenes();
		},
		[fetchOrdenes]
	);
	const verificarcolor = elestado => {
		let color = "";
		if (elestado == "Cancelado") {
			color = "bg-danger";
			return color;
		} else if (elestado == "Pendiente") {
			color = "bg-warning";
			return color;
		} else if (elestado == "Iniciado") {
			color = "bg-success";
			return color;
		} else if (elestado == "Finalizado") {
			color = "bg-info";
			return color;
		} else {
			color = "bg-warning";
			return color;
		}
	};
	return (
		<div className="container">
			<h2>Ordenes de trabajo</h2>
			<ul className="list-group container-fluid">
				{ordenes.length > 0 ? (
					ordenes.map(ordene => (
						<Listastotal
							status={verificarcolor(ordene.status)}
							id_nombre={ordene.id_nombre}
							url_info={`datos_orden/${ordene.id}`}
							textbutton2="Acreditar"
							//url_orden="Editar"
							key={ordene.id} //llave necesaria para que no se tumbe react y poder iterar
						/>
					))
				) : (
					<h2>Cargando...</h2>
				)}
			</ul>
			<div className="row justify-content-md-center mt-3">
				<div className="col-md-auto ">
					{store.user.perfil == "Admin" && (
						<Button variant="primary">
							{/* URL de crear orden basado en un contrato en especifico}
						{/* <Link className="text-light" to={`crear_orden/${contrato.id}`}></Link> */}
							<Link className="text-light" to={`crear_orden/${id}`}>
								Crear Orden de trabajo
							</Link>
						</Button>
					)}
				</div>
			</div>
			<div className="mt-5 row justify-content-md-center">
				<div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-md-auto  ">
					<div className="transparencia">
						<div className="float-left circle mx-1 bg-warning-transparente" />
						<div className="mb-1">Pendiente</div>
						<div className="float-left circle mx-1 bg-success-transparente" />
						<div className="mb-1">Iniciado</div>
						<div className="float-left circle mx-1 bg-info-transparente" />
						<div className="mb-1">Finalizado</div>
						<div className="float-left circle mx-1 bg-danger-transparente" />
						<div className="mb-1">Cancelado</div>
					</div>
				</div>
			</div>
		</div>
	);
};
