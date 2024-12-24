-- Bảng User
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50),
    `last_name` VARCHAR(50),
    `code_id` VARCHAR(12) COMMENT 'CCCD',
    `date_of_issue` DATE,
    `place_of_issue` VARCHAR(100),
    `date_of_birth` DATE,
    `home_town` VARCHAR(255),
    `email` VARCHAR(100),
    `password` VARCHAR(50),
    `phone` VARCHAR(15),
    PRIMARY KEY (`id`)
);

-- Bảng Role
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    `permission` INTEGER,
    PRIMARY KEY (`id`)
);

-- Bảng Permission
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100),
    PRIMARY KEY (`id`)
);

-- Bảng User_Role
CREATE TABLE `User_Role` (
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Role_Permission
CREATE TABLE `Role_Permission` (
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,
    PRIMARY KEY (`role_id`, `permission_id`),
    FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`permission_id`) REFERENCES `Permission`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Address
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `province` VARCHAR(100),
    `district` VARCHAR(100),
    `commune` VARCHAR(100),
    `detailed_address` VARCHAR(255),
    PRIMARY KEY (`id`)
);

-- Bảng Company
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(100),
    `phone` VARCHAR(15),
    `address` INTEGER,  -- Địa chỉ chính của công ty
    PRIMARY KEY (`id`),
    FOREIGN KEY (`address`) REFERENCES `Address`(`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Bảng Office
CREATE TABLE `Office` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `office_name` VARCHAR(100),
    `company_id` INTEGER NOT NULL,  -- Liên kết với công ty
    `address_id` INTEGER NOT NULL,  -- Địa chỉ văn phòng
    PRIMARY KEY (`id`),
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Route
CREATE TABLE `Route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_point` VARCHAR(100),
    `destination` VARCHAR(100),
    PRIMARY KEY (`id`)
);

-- Bảng Departure_Schedule (tách ngày và giờ khởi hành)
CREATE TABLE `Departure_Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route_id` INTEGER NOT NULL,  -- Liên kết với bảng Route
    `company_id` INTEGER NOT NULL,  -- Liên kết với bảng Company
    `departure_date` DATE NOT NULL,  -- Ngày khởi hành
    `departure_time` TIME NOT NULL,  -- Giờ khởi hành
    `pickup_point_id` INTEGER,  -- Điểm đón
    `dropoff_point_id` INTEGER, -- Điểm trả
    PRIMARY KEY (`id`),
    FOREIGN KEY (`route_id`) REFERENCES `Route`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`pickup_point_id`) REFERENCES `Pickup_Dropoff_Point`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`dropoff_point_id`) REFERENCES `Pickup_Dropoff_Point`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Company_Route
CREATE TABLE `Company_Route` (
    `company_id` INTEGER NOT NULL,
    `route_id` INTEGER NOT NULL,
    PRIMARY KEY (`company_id`, `route_id`),
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`route_id`) REFERENCES `Route`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Bus
CREATE TABLE `Bus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number_of_floors` TINYINT,
    `name` VARCHAR(100),
    `company_id` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Seat
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seat_number` VARCHAR(10),
    `floor` TINYINT,
    `bus_id` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Route_Departure_Schedule (Liên kết giữa Route và Departure_Schedule)
CREATE TABLE `Route_Departure_Schedule` (
    `route_id` INTEGER NOT NULL,
    `departure_schedule_id` INTEGER NOT NULL,
    PRIMARY KEY (`route_id`, `departure_schedule_id`),
    FOREIGN KEY (`route_id`) REFERENCES `Route`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`departure_schedule_id`) REFERENCES `Departure_Schedule`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Bus_Schedule
CREATE TABLE `Bus_Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bus_id` INTEGER NOT NULL,
    `route_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `departure_schedule_id` INTEGER NOT NULL,
    `pickup_point_id` INTEGER,  -- Điểm đón
    `dropoff_point_id` INTEGER, -- Điểm trả
    PRIMARY KEY (`id`),
    FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`route_id`) REFERENCES `Route`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`departure_schedule_id`) REFERENCES `Departure_Schedule`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`pickup_point_id`) REFERENCES `Pickup_Dropoff_Point`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`dropoff_point_id`) REFERENCES `Pickup_Dropoff_Point`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Route_Price
CREATE TABLE `Route_Price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,
    `departure_schedule_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL COMMENT 'Giá vé',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`route_id`) REFERENCES `Route`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`departure_schedule_id`) REFERENCES `Departure_Schedule`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Pickup/Dropoff Point
CREATE TABLE `Pickup_Dropoff_Point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route_id` INTEGER NOT NULL,
    `address_id` INTEGER NOT NULL COMMENT 'Địa chỉ điểm đón/trả',
    `type` ENUM('PICKUP', 'DROPOFF') NOT NULL COMMENT 'Loại điểm: đón hoặc trả',
    `name` VARCHAR(255) COMMENT 'Tên điểm đón/trả',
    `order` INTEGER COMMENT 'Thứ tự trên tuyến đường',
    PRIMARY KEY (`id`),
    FOREIGN KEY (`route_id`) REFERENCES `Route`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Bảng Company_Pickup_Point
CREATE TABLE `Company_Pickup_Point` (
    `company_id` INTEGER NOT NULL,
    `pickup_point_id` INTEGER NOT NULL,  -- Liên kết công ty với điểm đón
    PRIMARY KEY (`company_id`, `pickup_point_id`),
    FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`pickup_point_id`) REFERENCES `Pickup_Dropoff_Point`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);

CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    `user_id` INTEGER NOT NULL,  -- Liên kết với người dùng thực sự
    `first_name` VARCHAR(50) NULL,  -- Tên của người đặt hộ (nếu có)
    `last_name` VARCHAR(50) NULL,   -- Họ của người đặt hộ (nếu có)
    `phone` VARCHAR(15) NULL,  -- Số điện thoại của người đặt hộ
    `email` VARCHAR(100) NULL,  -- Email của người đặt hộ
    `total_price` DECIMAL(10, 2) NOT NULL,  -- Tổng giá trị của đơn hàng
    `order_date` DATETIME NOT NULL,  -- Thời gian đặt vé
    `status` ENUM('CONFIRMED', 'PENDING', 'CANCELLED') NOT NULL DEFAULT 'PENDING',  -- Trạng thái đơn hàng
    PRIMARY KEY(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);


CREATE TABLE `Order_Detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    `order_id` INTEGER NOT NULL,  -- Liên kết với bảng `Order`
    `bus_schedule_id` INTEGER NOT NULL,  -- Liên kết với lịch trình xe buýt
    `seat_id` INTEGER NOT NULL,  -- Liên kết với ghế ngồi
    `price` DECIMAL(10, 2) NOT NULL,  -- Giá vé tại thời điểm đặt
    PRIMARY KEY(`id`),
    FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`bus_schedule_id`) REFERENCES `Bus_Schedule`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE,
    FOREIGN KEY (`seat_id`) REFERENCES `Seat`(`id`) ON UPDATE NO ACTION ON DELETE CASCADE
);
