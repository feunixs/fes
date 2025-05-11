CREATE TABLE `access` (
  `id_access` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `script` varchar(50) NOT NULL
);

CREATE TABLE `barang` (
  `id_barang` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_golongan` int(11) DEFAULT null,
  `id_pabrik` int(11) NOT NULL,
  `barcode` varchar(50) DEFAULT null,
  `nama_barang` varchar(100) NOT NULL,
  `ml` int(11) DEFAULT null,
  `qty_dus` int(11) NOT NULL,
  `kode_kardus` varchar(50) DEFAULT null,
  `stock` int(11) DEFAULT null
);

CREATE TABLE `botol` (
  `id_botol` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_barang` int(11) NOT NULL,
  `nama_botol` varchar(50) NOT NULL,
  `stock` int(11) DEFAULT null
);

CREATE TABLE `customer` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_kelas` int(11) DEFAULT null,
  `kode` varchar(10) NOT NULL,
  `toko` varchar(50) NOT NULL,
  `customer` varchar(50) DEFAULT null,
  `alamat` text DEFAULT null,
  `no_ktp` varchar(20) DEFAULT null,
  `no_npwp` varchar(20) DEFAULT null,
  `telepon` varchar(20) DEFAULT null,
  `alamat_kirim` text DEFAULT null,
  `ttl` varchar(50) DEFAULT null
);

CREATE TABLE `embalasi_in` (
  `id_embalasi_in` int(11) PRIMARY KEY NOT NULL,
  `tanggal` date NOT NULL,
  `kode_cst` varchar(20) NOT NULL
);

CREATE TABLE `embalasi_in_detail` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_embalasi_in` int(11) NOT NULL,
  `id_botol` int(11) NOT NULL,
  `qty_botol` int(11) NOT NULL
);

CREATE TABLE `embalasi_out` (
  `id_embalasi_out` int(11) PRIMARY KEY NOT NULL,
  `tanggal` date NOT NULL,
  `kode_spl` varchar(20) NOT NULL
);

CREATE TABLE `embalasi_out_detail` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_embalasi_out` int(11) NOT NULL,
  `id_botol` int(11) NOT NULL,
  `qty_botol` int(11) NOT NULL
);

CREATE TABLE `form` (
  `script` varchar(50) PRIMARY KEY NOT NULL,
  `rights` varchar(5) NOT NULL,
  `form_desc` varchar(50) NOT NULL,
  `check_flag` tinyint(1) NOT NULL
);

CREATE TABLE `golongan` (
  `id_golongan` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `golongan` varchar(50) NOT NULL,
  `keterangan_golongan` varchar(100) NOT NULL
);

CREATE TABLE `harga` (
  `id_harga` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_item` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `mulai` date NOT NULL,
  `sampai` date NOT NULL
);

CREATE TABLE `hargabotol` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_botol` int(11) NOT NULL,
  `harga` int(11) NOT NULL,
  `mulai` date NOT NULL,
  `sampai` date NOT NULL
);

CREATE TABLE `history_barang` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_botol` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_customer` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_ei` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_eo` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_golongan` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_harga` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_hargabotol` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_item` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_karyawan` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_kelas` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_pabrik` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_payin` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_payout` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_po` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_price` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_so` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_supplier` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `history_user` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `timestamp` timestamp NOT NULL DEFAULT (current_timestamp()),
  `user_name` varchar(20) NOT NULL,
  `action` varchar(20) NOT NULL,
  `object_id` varchar(20) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `item` (
  `id_item` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_barang` int(11) NOT NULL,
  `nama_item` varchar(100) NOT NULL,
  `qty_pack` int(11) NOT NULL
);

CREATE TABLE `karyawan` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `kode_so` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `bagian` varchar(50) NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `alamat` text NOT NULL,
  `no_ktp` varchar(20) NOT NULL,
  `no_npwp` varchar(20) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `ttl` varchar(50) NOT NULL
);

CREATE TABLE `kelas_harga` (
  `id_kelas` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nama_kelas` varchar(20) NOT NULL,
  `keterangan_kelas` varchar(100) NOT NULL
);

CREATE TABLE `pabrik` (
  `id_pabrik` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `pabrik` varchar(50) NOT NULL,
  `keterangan_pabrik` varchar(100) NOT NULL
);

CREATE TABLE `po` (
  `id_po` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `no_po` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `kode_spl` varchar(20) NOT NULL,
  `tanggal_terima` date NOT NULL,
  `tanggal_tempo` date NOT NULL,
  `total_invoice` bigint(20) NOT NULL,
  `id_embalasi_out` int(11) NOT NULL
);

CREATE TABLE `po_detail` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_po` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `qty_barang` int(11) NOT NULL
);

CREATE TABLE `po_payment` (
  `id_po_payment` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_po` int(11) NOT NULL,
  `tanggal_bayar` date NOT NULL,
  `jumlah` bigint(20) NOT NULL,
  `tipe` varchar(20) NOT NULL
);

CREATE TABLE `so` (
  `id_so` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `no_so` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `kode_cst` varchar(20) NOT NULL,
  `tanggal_kirim` date NOT NULL,
  `tanggal_tempo` date NOT NULL,
  `id_embalasi_in` int(11) NOT NULL,
  `print_invoice` tinyint(1) NOT NULL,
  `print_do` tinyint(1) NOT NULL
);

CREATE TABLE `so_detail` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_so` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `qty_item` int(11) NOT NULL
);

CREATE TABLE `so_payment` (
  `id_so_payment` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_so` int(11) NOT NULL,
  `tanggal_bayar` date NOT NULL,
  `jumlah` bigint(20) NOT NULL,
  `tipe` varchar(20) NOT NULL
);

CREATE TABLE `stock` (
  `id_stock` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_barang` int(11) NOT NULL,
  `tanggal_stock` date NOT NULL,
  `stock` int(11) NOT NULL
);

CREATE TABLE `stockbotol` (
  `id_stockbotol` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_botol` int(11) NOT NULL,
  `tanggal_stockbotol` date NOT NULL,
  `stockbotol` int(11) NOT NULL
);

CREATE TABLE `supplier` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `kode_spl` varchar(20) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `no_rek` varchar(50) NOT NULL,
  `telepon` varchar(50) NOT NULL
);

CREATE TABLE `users` (
  `id_user` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `privilege` varchar(10) NOT NULL
);

CREATE UNIQUE INDEX `kode` ON `customer` (`kode`);

CREATE UNIQUE INDEX `golongan` ON `golongan` (`golongan`);

CREATE UNIQUE INDEX `kode` ON `karyawan` (`kode_so`);

CREATE UNIQUE INDEX `category` ON `kelas_harga` (`nama_kelas`);

CREATE UNIQUE INDEX `no_po` ON `po` (`no_po`);

CREATE UNIQUE INDEX `no_po` ON `so` (`no_so`);

CREATE UNIQUE INDEX `kode_spl` ON `supplier` (`kode_spl`);

CREATE UNIQUE INDEX `nama` ON `supplier` (`nama`);

CREATE UNIQUE INDEX `user_name` ON `users` (`user_name`);
