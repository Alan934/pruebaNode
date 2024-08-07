/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - tituloBanner
 *         - urlImagenBanner
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del banner
 *         tituloBanner:
 *           type: string
 *           description: Título del banner
 *         urlImagenBanner:
 *           type: string
 *           description: URL de la imagen del banner
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BannerHero:
 *       type: object
 *       required:
 *         - TituloBannerHero
 *         - DescripcionBannerHero
 *         - urlImagenBannerHero
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del banner hero
 *         TituloBannerHero:
 *           type: string
 *           description: Título del banner hero
 *         DescripcionBannerHero:
 *           type: string
 *           description: Descripción del banner hero
 *         urlImagenBannerHero:
 *           type: string
 *           description: URL de la imagen del banner hero
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del banner hero
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *         - nombreCategoria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la categoria
 *         nombreCategoria:
 *           type: string
 *           description: Nombre de la categoria
 *         vistaId:
 *           type: integer
 *           description: ID de la vista asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategoria:
 *       type: object
 *       required:
 *         - nombreSubCategoria
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado de la subcategoria
 *         nombreSubCategoria:
 *           type: string
 *           description: Nombre de la subcategoria
 *         categoriaId:
 *           type: integer
 *           description: ID de la categoria asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Formulario:
 *       type: object
 *       required:
 *         - nombreUsuario
 *         - eMail
 *         - empresa
 *         - rubroEmpresa
 *         - mensaje
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del formulario
 *         nombreUsuario:
 *           type: string
 *           description: Nombre del usuario
 *         eMail:
 *           type: string
 *           description: Email del usuario
 *         empresa:
 *           type: string
 *           description: Empresa del usuario
 *         rubroEmpresa:
 *           type: string
 *           description: Rubro de la empresa
 *         mensaje:
 *           type: string
 *           description: Mensaje del usuario
 *         categoriaId:
 *           type: integer
 *           description: ID de la categoría relacionada
 *         userId:
 *           type: integer
 *           description: ID del user relacionado
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - teamDescription
 *         - teamName
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del equipo
 *         teamDescription:
 *           type: string
 *           description: Descripción del equipo
 *         teamName:
 *           type: string
 *           description: Nombre del equipo
 *         subCategoriaId:
 *           type: integer
 *           description: ID de subCategoria relacionado
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       required:
 *         - memberSpecialization
 *         - memberName
 *         - memberURLImg
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del miembro del equipo
 *         memberSpecialization:
 *           type: string
 *           description: Especialización del miembro del equipo
 *         memberName:
 *           type: string
 *           description: Nombre del miembro del equipo
 *         memberURLImg:
 *           type: string
 *           description: URL de la imagen del miembro del equipo
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación del miembro del equipo
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMemberTechnology:
 *       type: object
 *       required:
 *         - URLIconTechnology
 *         - technologyName
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del TeamMemberTechnology
 *         URLIconTechnology:
 *           type: string
 *           description: URL del icono de la tecnología
 *         technologyName:
 *           type: string
 *           description: Nombre de la tecnología
 *         team_member_id:
 *           type: integer
 *           description: ID del miembro del equipo asociado
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Footer:
 *       type: object
 *       required:
 *         - titleFooter
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-generado del footer
 *         titleFooter:
 *           type: string
 *           description: Título del footer
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Desplegable:
 *       type: object
 *       required:
 *         - tituloDesplegable
 *         - textoDesplegable
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del desplegable
 *           example: 1
 *         tituloDesplegable:
 *           type: string
 *           description: Título del desplegable
 *           example: "Título de ejemplo"
 *         textoDesplegable:
 *           type: string
 *           description: Texto del desplegable
 *           example: "Este es un texto descriptivo para el desplegable."
 *         seccionDesplegableId:
 *           type: integer
 *           description: ID de la sección a la que pertenece el desplegable
 *           example: 2
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Marca de tiempo de la eliminación suave
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización del registro
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Metodologia:
 *       type: object
 *       required:
 *         - tituloMetodologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la metodologia
 *         tituloMetodologia:
 *           type: string
 *           description: Título de la metodologia
 *         seccionMetodologiaId:
 *           type: integer
 *           description: ID de la sección de metodologia asociada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la metodologia
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización de la metodologia
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación de la metodologia, si aplica (para eliminación suave)
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - subtituloItem
 *         - tituloItem
 *         - urlIconItem
 *       properties:
 *         subtituloItem:
 *           type: string
 *           description: Subtítulo del item
 *         tituloItem:
 *           type: string
 *           description: Título del item
 *         urlIconItem:
 *           type: string
 *           description: URL del ícono del item
 *         id_banner:
 *           type: integer
 *           description: ID del banner asociado 
 *         id_desplegable:
 *           type: integer
 *           description: ID del desplegable asociado 
 *         id_metodologia:
 *           type: integer
 *           description: ID de la metodología asociada 
 *         id_card:
 *           type: integer
 *           description: ID de la tarjeta asociada 
 *         id_footer:
 *           type: integer
 *           description: ID del footer asociado 
 *         id_sectionText:
 *           type: integer
 *           description: ID del texto de sección asociado 
 *         id_bannerHero:
 *           type: integer
 *           description: ID del texto de bannerHero asociado 
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - nombreCard
 *         - urlImagenCard
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la card
 *         nombreCard:
 *           type: string
 *           description: Nombre de la card
 *         urlImagenCard:
 *           type: string
 *           description: URL de la imagen de la card
 *         seccionCardId:
 *           type: integer
 *           description: ID de la sección de la card
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la card
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Tecnologia:
 *       type: object
 *       required:
 *         - nombreTecnologia
 *         - urlImagenTecnologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la tecnología
 *         nombreTecnologia:
 *           type: string
 *           description: Nombre de la tecnología
 *         urlImagenTecnologia:
 *           type: string
 *           description: URL de la imagen de la tecnología
 *         seccionTecnologiaId:
 *           type: integer
 *           description: ID de la sección de tecnología
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionCard:
 *       type: object
 *       required:
 *         - tituloSeccionCard
 *         - subTituloSeccionCard
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Sección Card
 *         tituloSeccionCard:
 *           type: string
 *           description: Título de la sección card
 *         subTituloSeccionCard:
 *           type: string
 *           description: Subtítulo de la sección card
 *         seccionGeneralId:
 *           type: integer
 *           description: ID de la sección general asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección card
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionDesplegable:
 *       type: object
 *       required:
 *         - nombreSeccionDesplegable
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la sección desplegable
 *         nombreSeccionDesplegable:
 *           type: string
 *           description: Nombre de la sección desplegable
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección desplegable
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionGeneral:
 *       type: object
 *       required:
 *         - tituloSeccionGeneral
 *         -  subTituloSeccionGeneral
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la Seccion General
 *         tituloSeccionGeneral:
 *           type: string
 *           description: Título de la Seccion General
 *         subTituloSeccionGeneral:
 *           type: string
 *           description: Subtítulo de la Seccion General
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la Seccion General
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionMetodologia:
 *       type: object
 *       required:
 *         - tituloSeccionMetodologia
 *         - subTituloSeccionMetodologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la sección de metodología
 *         tituloSeccionMetodologia:
 *           type: string
 *           description: Título de la sección de metodología
 *         subTituloSeccionMetodologia:
 *           type: string
 *           description: Subtítulo de la sección de metodología
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría asociada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección de metodología
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SeccionTecnologia:
 *       type: object
 *       required:
 *         - tituloSeccionTecnologia
 *         - subTituloSeccionTecnologia
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la sección de tecnología
 *         tituloSeccionTecnologia:
 *           type: string
 *           description: Título de la sección de tecnología
 *         subTituloSeccionTecnologia:
 *           type: string
 *           description: Subtítulo de la sección de tecnología (opcional)
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la sección de tecnología
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SectionText:
 *       type: object
 *       required:
 *         - subtitleSectionText
 *         - titleSectionText
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del texto de la sección
 *         subtitleSectionText:
 *           type: string
 *           description: Subtítulo del texto de la sección
 *         titleSectionText:
 *           type: string
 *           description: Título del texto de la sección
 *         subCategoriaId:
 *           type: integer
 *           description: ID de la subcategoría relacionada
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del texto de la sección
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaFooter:
 *       type: object
 *       required:
 *         - titleCategoriaFooter
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la categoría del footer
 *         titleCategoriaFooter:
 *           type: string
 *           description: Título de la categoría del footer
 *         id_footer:
 *           type: integer
 *           description: ID del footer asociado
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave de la categoría del footer
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Vista:
 *       type: object
 *       required:
 *         - nombreVista
 *         - iconUrlVista
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la vista
 *         nombreVista:
 *           type: string
 *           description: Nombre de la vista
 *         iconUrlVista:
 *           type: string
 *           description: URL del ícono de la vista
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del vista
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthRequestRegistrer:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario (requerido solo para registro)
 *         age:
 *           type: integer
 *           description: Edad del usuario (requerido solo para registro)
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         name: 
 *         age: 
 *         email: 
 *         password: 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponseLogin:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para autenticación
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: Correo electrónico del usuario
 *             password:
 *               type: string
 *               description: Contraseña del usuario
 *       example:
 *           password:
 *           email: 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         age:
 *           type: integer
 *           description: Edad del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Rol del usuario
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de eliminación suave del usuario
 */
