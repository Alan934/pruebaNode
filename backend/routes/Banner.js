const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");
const {
  getAllBanners,
  getBannerById,
  deleteBannerById,
  createBanner,
  updateBannerById,
  recoverBannerById
} = require("../controllers/BannerController");

/**
 * @swagger
 * tags:
 *   name: Banner
 *   description: Operaciones de banners
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Banner:
 *       type: object
 *       required:
 *         - tituloBanner
 *         - urlImagenBanner
 *         - subtituloBanner
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del banner
 *         tituloBanner:
 *           type: string
 *           description: Título del banner
 *         subtituloBanner:
 *           type: string
 *           description: Subtítulo del banner
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
 * /api/banner:
 *   get:
 *     summary: Obtiene todos los banners
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: Lista de banners
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Banner'
 */
router.get("/", getAllBanners);

/**
 * @swagger
 * /api/banner/{id}:
 *   get:
 *     summary: Obtiene un banner por ID
 *     tags: [Banner]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner
 *     responses:
 *       200:
 *         description: Banner encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       404:
 *         description: Banner no encontrado
 */
router.get("/:id", getBannerById);

/**
 * @swagger
 * /api/banner:
 *   post:
 *     summary: Crea un nuevo banner
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Banner'
 *     responses:
 *       201:
 *         description: Banner creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createBanner);

/**
 * @swagger
 * /api/banner/{id}:
 *   put:
 *     summary: Actualiza un banner por ID
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Banner'
 *     responses:
 *       200:
 *         description: Banner actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Banner'
 *       404:
 *         description: Banner no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateBannerById);

/**
 * @swagger
 * /api/banner/{id}:
 *   delete:
 *     summary: Elimina un banner por ID
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner
 *     responses:
 *       200:
 *         description: Banner eliminado exitosamente
 *       404:
 *         description: Banner no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteBannerById);

/**
 * @swagger
 * /api/banner/recover/{id}:
 *   patch:
 *     summary: Recupera un banner eliminado por ID
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner
 *     responses:
 *       200:
 *         description: Banner recuperado exitosamente
 *       404:
 *         description: Banner no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverBannerById);

module.exports = router;
