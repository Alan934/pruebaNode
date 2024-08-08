const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middleware/session');
const checkRol = require("../middleware/rol");
const {
  getAllBannersHero,
  getBannerHeroById,
  createBannerHero,
  deleteBannerHeroById,
  updateBannerHeroById,
  recoverBannerHeroById
} = require("../controllers/BannerHeroController");

/**
 * @swagger
 * tags:
 *   name: BannerHero
 *   description: Operaciones de banners hero
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     BannerHero:
 *       type: object
 *       required:
 *         - tituloBannerHero
 *         - descripcionBannerHero
 *         - urlImagenBannerHero
 *       properties:
 *         id:
 *           type: integer
 *           description: ID del banner hero
 *         tituloBannerHero:
 *           type: string
 *           description: Título del banner hero
 *         descripcionBannerHero:
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
 * /api/bannerhero:
 *   get:
 *     summary: Obtiene todos los banners hero
 *     tags: [BannerHero]
 *     responses:
 *       200:
 *         description: Lista de banners hero
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BannerHero'
 */
router.get("/", getAllBannersHero);

/**
 * @swagger
 * /api/bannerhero/{id}:
 *   get:
 *     summary: Obtiene un banner hero por ID
 *     tags: [BannerHero]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner hero
 *     responses:
 *       200:
 *         description: Banner hero encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerHero'
 *       404:
 *         description: Banner hero no encontrado
 */
router.get("/:id", getBannerHeroById);

/**
 * @swagger
 * /api/bannerhero:
 *   post:
 *     summary: Crea un nuevo banner hero
 *     tags: [BannerHero]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BannerHero'
 *     responses:
 *       201:
 *         description: Banner hero creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerHero'
 *       500:
 *         description: Error en el servidor
 */
router.post("/", authMiddleware, checkRol(["admin"]), createBannerHero);

/**
 * @swagger
 * /api/bannerhero/{id}:
 *   put:
 *     summary: Actualiza un banner hero por ID
 *     tags: [BannerHero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner hero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BannerHero'
 *     responses:
 *       200:
 *         description: Banner hero actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BannerHero'
 *       404:
 *         description: Banner hero no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put("/:id", authMiddleware, checkRol(["admin"]), updateBannerHeroById);

/**
 * @swagger
 * /api/bannerhero/{id}:
 *   delete:
 *     summary: Elimina un banner hero por ID
 *     tags: [BannerHero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner hero
 *     responses:
 *       200:
 *         description: Banner hero eliminado exitosamente
 *       404:
 *         description: Banner hero no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), deleteBannerHeroById);

/**
 * @swagger
 * /api/bannerhero/recover/{id}:
 *   patch:
 *     summary: Recupera un banner hero eliminado por ID
 *     tags: [BannerHero]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del banner hero
 *     responses:
 *       200:
 *         description: Banner hero recuperado exitosamente
 *       404:
 *         description: Banner hero no encontrado o ya activo
 *       500:
 *         description: Error en el servidor
 */
router.patch("/recover/:id", authMiddleware, checkRol(["admin"]), recoverBannerHeroById);

module.exports = router;