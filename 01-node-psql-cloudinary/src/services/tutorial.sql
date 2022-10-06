--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-06 14:15:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 25401)
-- Name: tutorial; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA tutorial;


ALTER SCHEMA tutorial OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 25403)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    cloudinary_id character varying(128) NOT NULL,
    image_url character varying(128) NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 25402)
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO postgres;

--
-- TOC entry 3314 (class 0 OID 0)
-- Dependencies: 210
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- TOC entry 3165 (class 2604 OID 25406)
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- TOC entry 3308 (class 0 OID 25403)
-- Dependencies: 211
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, title, cloudinary_id, image_url) FROM stdin;
1	judul update	za3yu3f3dfgyekkihvff	https://res.cloudinary.com/dtl0mmhng/image/upload/v1665025520/za3yu3f3dfgyekkihvff.png
4	judul	f4ljvwpg1ytxswr0da1p	https://res.cloudinary.com/dtl0mmhng/image/upload/v1665026299/f4ljvwpg1ytxswr0da1p.png
\.


--
-- TOC entry 3315 (class 0 OID 0)
-- Dependencies: 210
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 4, true);


--
-- TOC entry 3167 (class 2606 OID 25408)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


-- Completed on 2022-10-06 14:15:07

--
-- PostgreSQL database dump complete
--

