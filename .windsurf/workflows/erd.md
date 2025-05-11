---
description: Entity-Relationship Diagram (ERD) based on the SQL database structure
---

erDiagram
    users ||--o{ access : "has"
    users {
        int id_user PK
        string user_name
        string password
        string privilege
    }
    
    access {
        int id_access PK
        int id_user FK
        string script
    }
    
    form {
        string script PK
        string rights
        string form_desc
        boolean check_flag
    }
    
    access }o--|| form : "references"
    
    %% Master Data - Customer
    customer {
        int id PK
        int id_kelas FK
        string kode
        string toko
        string customer
        string alamat
        string no_ktp
        string no_npwp
        string telepon
        string alamat_kirim
        string ttl
    }
    
    kelas_harga ||--o{ customer : "classifies"
    kelas_harga {
        int id_kelas PK
        string nama_kelas
        string keterangan_kelas
    }
    
    %% Master Data - Supplier
    supplier {
        int id PK
        string kode_spl
        string nama
        string alamat
        string no_rek
        string telepon
    }
    
    %% Master Data - Karyawan (Employee)
    karyawan {
        int id PK
        string kode_so
        string nama
        string bagian
        date tanggal_masuk
        string alamat
        string no_ktp
        string no_npwp
        string telepon
        string ttl
    }
    
    %% Master Data - Barang (Item)
    barang {
        int id_barang PK
        int id_golongan FK
        int id_pabrik FK
        string barcode
        string nama_barang
        int ml
        int qty_dus
        string kode_kardus
        int stock
    }
    
    golongan ||--o{ barang : "categorizes"
    golongan {
        int id_golongan PK
        string golongan
        string keterangan_golongan
    }
    
    pabrik ||--o{ barang : "produces"
    pabrik {
        int id_pabrik PK
        string pabrik
        string keterangan_pabrik
    }
    
    barang ||--o{ item : "contains"
    item {
        int id_item PK
        int id_barang FK
        string nama_item
        int qty_pack
    }
    
    %% Master Data - Botol (Embalasi)
    barang ||--o{ botol : "has"
    botol {
        int id_botol PK
        int id_barang FK
        string nama_botol
        int stock
    }
    
    %% Pricing
    item ||--o{ harga : "priced at"
    kelas_harga ||--o{ harga : "defines"
    harga {
        int id_harga PK
        int id_item FK
        int id_kelas FK
        int harga
        date mulai
        date sampai
    }
    
    botol ||--o{ hargabotol : "priced at"
    hargabotol {
        int id PK
        int id_botol FK
        int harga
        date mulai
        date sampai
    }
    
    %% Purchased - Purchase Order
    supplier ||--o{ po : "receives"
    po {
        int id_po PK
        string no_po
        string user
        string kode_spl
        date tanggal_terima
        date tanggal_tempo
        bigint total_invoice
        int id_embalasi_out FK
    }
    
    po ||--o{ po_detail : "contains"
    barang ||--o{ po_detail : "included in"
    po_detail {
        int id PK
        int id_po FK
        int id_barang FK
        int qty_barang
    }
    
    po ||--o{ po_payment : "paid via"
    po_payment {
        int id_po_payment PK
        int id_po FK
        date tanggal_bayar
        bigint jumlah
        string tipe
    }
    
    %% Purchased - Embalasi Out
    supplier ||--o{ embalasi_out : "receives"
    embalasi_out {
        int id_embalasi_out PK
        date tanggal
        string kode_spl
    }
    
    embalasi_out ||--o{ embalasi_out_detail : "contains"
    botol ||--o{ embalasi_out_detail : "included in"
    embalasi_out_detail {
        int id PK
        int id_embalasi_out FK
        int id_botol FK
        int qty_botol
    }
    
    %% Transaction - Invoice (SO)
    customer ||--o{ so : "places"
    so {
        int id_so PK
        string no_so
        string user
        string kode_cst
        date tanggal_kirim
        date tanggal_tempo
        int id_embalasi_in FK
        boolean print_invoice
        boolean print_do
    }
    
    so ||--o{ so_detail : "contains"
    item ||--o{ so_detail : "included in"
    so_detail {
        int id PK
        int id_so FK
        int id_item FK
        int qty_item
    }
    
    so ||--o{ so_payment : "paid via"
    so_payment {
        int id_so_payment PK
        int id_so FK
        date tanggal_bayar
        bigint jumlah
        string tipe
    }
    
    %% Transaction - Embalasi In
    customer ||--o{ embalasi_in : "returns"
    embalasi_in {
        int id_embalasi_in PK
        date tanggal
        string kode_cst
    }
    
    embalasi_in ||--o{ embalasi_in_detail : "contains"
    botol ||--o{ embalasi_in_detail : "included in"
    embalasi_in_detail {
        int id PK
        int id_embalasi_in FK
        int id_botol FK
        int qty_botol
    }
    
    %% Stock tracking
    barang ||--o{ stock : "tracked in"
    stock {
        int id_stock PK
        int id_barang FK
        date tanggal_stock
        int stock
    }
    
    botol ||--o{ stockbotol : "tracked in"
    stockbotol {
        int id_stockbotol PK
        int id_botol FK
        date tanggal_stockbotol
        int stockbotol
    }
    
    %% Relationships between main transaction tables
    po }o--|| embalasi_out : "includes"
    so }o--|| embalasi_in : "includes"