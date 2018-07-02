@extends('layouts.application_form')
@section('content')
	@if ($errors->any())
	    <div class="alert alert-danger">
	        <ul>
	            @foreach ($errors->all() as $error)
	                <li>{{ $error }}</li>
	            @endforeach
	        </ul>
	    </div>
	@endif
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<link rel="stylesheet" href="{{asset('js/crop_dist/cropper.css')}}"></script>
  	<link rel="stylesheet" href="{{asset('js/crop_dist/main.css')}}">
	<div class="content container">
	<!-- <div id='progress'><div id='progress-complete'></div></div> -->
    <form id="SignupForm" action="{{action('ApplicantController@saveForm')}}" method="post"  enctype="multipart/form-data">
    	<input type="hidden" name="_token" value="{{ csrf_token() }}">
        <fieldset>
        	<div class="box border-none">
	            <h2 class="title">กลุ่มบริษัท ห้องอาหารสีฟ้า (SEEFAH RESTAURANT GROUP)</h2>
	            <div class="brand-logo">
	            	<h2><span>ใบสมัครงาน </span> (Application Form)</h2>
	            	<span class="brand">
	            		
	            	 	<a href="javascript:void(0)"><img src="images/group_logo/{{$groupLogo}}" alt="brand" title=""></a>
	            	 

	            	</span>
	            </div>
	            <div class="radio-group">
	            	<?php $count=1; ?>
		            @foreach($business_types as $unit_btype)
		            	
		            	<label class="radio-wrap">
		            		@if($count==1)
		            			<input name="business_type" type="radio" value="{{$unit_btype->name}}" checked="checked">
		            			<span class="radio-label ">{{$unit_btype->name}}</span>
		            		@else
		            			<input name="business_type" type="radio" value="{{$unit_btype->name}}" selected="selected">
		            			<span class="radio-label ">{{$unit_btype->name}}</span>
		            		@endif

		            	</label>	
		            	<?php $count++; ?>
		            @endforeach

					{{-- <label class="radio-wrap">
						<input name="business_type" type="radio" value="male"> 
						<span class="radio-label ">กลุ่มธุรกิจร้านอาหาร</span>
					</label> --}}
					{{-- <label class="radio-wrap">
						<input name="business_type" type="radio" value="male"> 
						<span class="radio-label ">กลุ่มธุรกิจ F&B Service.</span>
					</label>
					<label class="radio-wrap">
						<input name="business_type" type="radio" value="none"> 
					<span class="radio-label ">กลุ่มธุรกิจผลิตอาหาร</span></label> --}}
				</div>
			</div>

            <div class="box mt-20">
            	<div class="col">
            		<div class="col">
            			<label>ตำแหน่งที่ต้องการ <span class="block">Position applied for</span> </label>
            		</div>
            		<select class="md-input" name="postion_applied" required="required">
            			{{-- <option>Developer</option>
            			<option>select</option>
            			<option>Manager</option>
            			<option>Cordinator</option> --}}
            			@foreach($positions as $unitposition)
            				<option value="{{$unitposition->name}}">{{$unitposition->name}}</option>

            			@endforeach

            		</select>
            	</div>
            	<div class="col">
            		<div class="col">
            			<label>เงินเดือนที่ต้องการ (ควรระบุ) <span class="block">Expected starting salary</span> </label>
            		</div>
            		<input name='expected_sal' type="text" class="md-input numValidate" autocomplete="off"/>
            		&nbsp;<span class="col">บาท <br/> Baht</span>
            	</div>
            </div>

            <div class="box border-none">
            	ใบสมัครเป็นส่วนหนึ่งของการพิจารณาโปรดกรอกข้อความให้ครบถ้วน
            	<div> Application Form is  a part of consideration please fill this form completely</div>
            </div>

            <div class="box-group">
            	<div class="box">
            		<h3><strong>ประวัติส่วนตัว (Personal Background)</strong></h3>
            		<div class="form-row">
		            	<div class="col">
		            		<div class="col">
		            			<label>ชื่อ (คำนำหน้า-ชื่อ) <span class="block">Firstname</span> </label>
		            		</div>
		            		<input name="fname" type="text" class="lg-input" required="required" />
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>สกุล <span class="block">Lastname</span> </label>
		            		</div>
		            		<input name="lname" type="text" class="md-input" required="required" />
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ชื่อเล่น <span class="block">Nickname</span> </label>
		            		</div>
		            		<input name="nname" type="text" class="sm-input" required="required">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>เพศ <span class="block">Sex</span> </label>
		            		</div>
		            		<select name="sex" class="md-xs">
		            			<option value="male">ชาย</option>
		            			<option value="female">หญิง</option>
		            		</select>
		            	</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="col">
	            		<div class="col">
	            			<label>วัน เดือน ปีเกิด <span class="block">Date of birth</span> </label>
	            		</div>
	            		<input name="dob" type="text" data-attr="dateofbirth" class="sm-input date-select" required="required">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>สัญชาติ <span class="block">Nationality</span> </label>
	            		</div>
	            		<input name="nationality" type="text" class="sm-input">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>เชื้อชาติ <span class="block">Race</span> </label>
	            		</div>
	            		<input name="race" type="text" class="sm-input ">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>ศาสนา <span class="block">Religion</span> </label>
	            		</div>
	            		<input name="religion" type="text" class="sm-input">
	            	</div>
            	</div>
            	<div class="box">
            		<div class="col">
	            		<div class="col">
	            			<label>อายุ <span class="block">Age</span> </label>
	            		</div>
	            		<input name="age" class="xs-input" type="text">
	            		&nbsp;<span class="col">ปี <br> Year</span>
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>ส่วนสูง <span class="block">Height</span> </label>
	            		</div>
	            		<input name="height" class="xs-input removeNonDigits" type="text">
	            		&nbsp;<span class="col">ซม <br> cm</span>
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>น้ำหนัก <span class="block">Weight</span> </label>
	            		</div>
	            		<input name="weight" class="xs-input removeNonDigits" type="text">
	            		&nbsp;<span class="col">กก <br> Kgs</span>
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>ตำหนิ <span class="block">Scar</span> </label>
	            		</div>
	            		<input name="scar" class="xs-input" type="text">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>กรุ๊ปเลือด <span class="block">Blood</span> </label>
	            		</div>
	            		<input name="blood" class="xs-input" type="text">
	            	</div>
            	</div>
            	<div class="box">
            		<div class="col">
	            		<div class="col">
	            			<label>ภูมิลำเนา<span class="block">Place of birth</span> </label>
	            		</div>
	            		<input name="birth_place" type="text" class="sm-input">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>โทรศัพท์มือถือ <span class="block">Telephone</span> </label>
	            		</div>
	            		<input name="telephone" type="text" class="sm-input removeNonDigits" required="required">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>โทรศัพท์บ้าน <span class="block">Home</span> </label>
	            		</div>
	            		<input name="home_no" type="text" class="sm-input removeNonDigits">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>สำนักงาน <span class="block">Office</span> </label>
	            		</div>
	            		<input name="office_no" type="text" class="sm-input removeNonDigits">
	            	</div>
            	</div>
            	<div class="box">
            		<div class="col vtop">
	            		<div class="col">
	            			<label>ที่อยู่ที่สามารถติดต่อได้<span class="block">Present Address</span> </label>
	            		</div>
            			<textarea name="present_addr" class="lg-textarea" required="required"></textarea>	            		
	            	</div>
            	</div>
            	<div class="box">
            		<div class="col vtop">
	            		<div class="col">
	            			<label>ที่อยู่ตามทะเบียนบ้าน <span class="block">Home Registration &nbsp;</span> </label>
	            		</div>
            			<textarea name="home_reg" class="lg-textarea"></textarea>	            		
	            	</div>
            	</div>
            	<div class="box">
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>เลขที่บัตรประชาชน <span class="block">ID Card No.</span> </label>
		            		</div>
		            		<input name="id_card_no" class="md-input id_card_no" type="text" required="required" placeholder="">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>วันออกบัตร <span class="block">Issued date</span> </label>
		            		</div>
		            		<input name="issue_date" class="sm-input date-select" type="text" required="required">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>บัตรหมดอายุ <span class="block">Expired date</span> </label>
		            		</div>
		            		<input name="expire_date" class="sm-input date-select" type="text" required="required">
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ออกให้ ณ. อำเภอ/เขต <span class="block">Issued to District</span> </label>
		            		</div>
		            		<input name="issue_district" class="md-input" type="text">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>จังหวัด <span class="block">Province</span> </label>
		            		</div>
		            		<select name="issue_province" class="md-input valid" aria-invalid="false">
		            		@foreach($province as $unitprovince)
		            			<option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option>
		            		@endforeach
		            		</select>
		            	</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="col">
	            		<div class="col">
	            			<label>สถานะความเป็นอยู่ <span class="block">Living Status</span> </label>
	            		</div>
	            		<div class="col radio-labelgroup">
	            			<label class="radio-wrap">
	            				<input name="livingstatus" type="radio" checked="checked" value="Own home"> 
	            					<span class="radio-label ">บ้านส่วนตัว <span class="block"> Own home</span></span>
	            				</label>
	            			<label class="radio-wrap"><input name="livingstatus" type="radio" value="Home for rent"> <span class="radio-label ">บ้านเช่า <span class="block"> Home for rent</span></span></label>
	            			<label class="radio-wrap"><input name="livingstatus" type="radio" value="live with parents"> <span class="radio-label ">อาศัยบิดา/มารดา <span class="block"> Live with parents</span></span></label>
	            			<label class="radio-wrap"><input name="livingstatus" type="radio" value="etc"> <span class="radio-label ">อื่นๆ <span class="block"> Etc.</span></span></label>
	            		</div>
	            	</div>
            	</div>
            	<div class="box">
            		<div class="col">
	            		<div class="col">
	            			<label>สถานะครอบครัว <span class="block">Marital Status</span> </label>
	            		</div>
	            		<div class="col radio-labelgroup">
	            			<label class="radio-wrap">
	            				<input name="matstatus" type="radio" checked="checked" value="single"> 
	            				<span class="radio-label ">โสด <span class="block"> Single</span></span>
	            			</label>
	            			<label class="radio-wrap">
	            				<input name="matstatus" type="radio" value="married"> 
	            				<span class="radio-label ">แต่งงาน <span class="block"> Married</span></span>
	            			</label>
	            			<label class="radio-wrap">
	            				<input name="matstatus" type="radio" value="divorced"> 
	            				<span class="radio-label ">หย่า <span class="block"> Divorced</span></span>
	            			</label>
	            			<label class="radio-wrap">
	            				<input name="matstatus" type="radio" value="widowed"> 
	            				<span class="radio-label ">หม้าย <span class="block"> Widowed</span></span>
	            			</label>
	            			<label class="radio-wrap">
	            				<input name="matstatus" type="radio" value="separated"> 
	            				<span class="radio-label ">แยกกันอยู่ <span class="block"> Separated</span></span>
	            			</label>
	            		</div>
	            	</div>
            	</div>
            	<div class="box">
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ชื่อคู่สมรส <span class="block">Spouse Name</span> </label>
		            		</div>
		            		<input class="md-input" type="text" name="spouse_name">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>อาชีพ <span class="block">Occupation</span> </label>
		            		</div>
		            		<input class="sm-input" type="text" name="spouse_occupation">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>จำนวนบุตร <span class="block">No. of Children</span> </label>
		            		</div>
		            		<div class="col"> 
		            			<select class="sm-input" name="spouse_noofchild">

		            				@for($i=0; $i<=15;$i++)
		            				<option value="{{$i}}">{{$i}}</option>
		            				@endfor
		            			</select>
		            		</div>
		            		<div class="col">คน</div>
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>สถานที่ทำงาน <span class="block">Firm Address</span> </label>
		            		</div>
		            		<input name="spouse_address" class="sm-input" type="text">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>โทรศัพท์ <span class="block">Telephone</span> </label>
		            		</div>
		            		<input name="spouse_mobile" class="sm-input removeNonDigits" type="text">
		            	</div>
            		</div>
            	</div>

            	<div class="box">
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ชื่อบิดา <span class="block">Name of Father</span> </label>
		            		</div>
		            		<input name="father_name" class="md-input" type="text" required="required">
		            	</div>		            	
		            	<div class="col">
		            		<div class="col">
		            			<label>อายุ <span class="block">Age</span> </label>
		            		</div>
		            		<div class="col"> 
		            			<select class="sm-input" name="father_age" required="required">
			            			@for($a=20; $a<=100; $a++)
			            				<option value="{{$a}}">{{$a}}</option>
			            			@endfor
		            			</select>
		            		</div>
		            		<div class="col"><label>ปี <span class="block">Year</span> </label></div>
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>อาชีพ <span class="block">Occupation</span> </label>
		            		</div>
		            		<input name="fater_occupation" class="sm-input" type="text">
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col radio-labelgroup">
	            			<label class="radio-wrap mt">
	            				<input name="falive" checked="checked" type="radio" value="alive"> 
	            				<span class="radio-label ">มีชีวิต <span class="block"> Alive</span></span>
	            			</label>
	            			<label class="radio-wrap">
	            				<input name="falive" type="radio" value="passed"> 
	            				<span class="radio-label ">ถึงแก่กรรม <span class="block"> Passed away</span></span></label>
	            		</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ชื่อมารดา <span class="block">Name of Mother</span> </label>
		            		</div>
		            		<input name="mother_name" class="md-input" type="text" required="required">
		            	</div>		            	
		            	<div class="col">
		            		<div class="col">
		            			<label>อายุ <span class="block">Age</span> </label>
		            		</div>
		            		<div class="col"> 
		            			<select class="sm-input" name="mother_age">
		            				@for($a=20; $a<=100; $a++)
			            				<option value="{{$a}}">{{$a}}</option>
			            			@endfor
		            			</select>
		            		</div>
		            		<div class="col"><label>ปี <span class="block">Year</span> </label></div>
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>อาชีพ <span class="block">Occupation</span> </label>
		            		</div>
		            		<input class="sm-input" type="text" name="mother_occupation">
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col radio-labelgroup">
	            			<label class="radio-wrap mt">
	            				<input name="malive" checked="checked" type="radio" value="alive"> 
	            				<span class="radio-label ">มีชีวิต <span class="block"> Alive</span></span>
	            			</label>
	           				<label class="radio-wrap">
	           					<input name="malive" type="radio" value="passed"> 
	           					<span class="radio-label ">ถึงแก่กรรม <span class="block"> Passed away</span></span>
	           				</label>
	            		</div>
            		</div>
            	</div>

            	<div class="box">
            		<div class="col">
	            		<div class="col">
	            			<label>สถานะทางการทหาร <span class="block">Military Status</span> </label>
	            		</div>
	            		<div class="col radio-labelgroup">
	            			<label class="radio-wrap">
		            			<input name="militstatus" type="radio" checked="checked" value="exempted"> 
		            			<span class="radio-label ">ได้รับการยกเว้น <span class="block"> Exempted</span></span>
		            		</label>
	            			<label class="radio-wrap">
	            				<input name="militstatus" type="radio" value="military studied"> 
	            				<span class="radio-label ">เรียนรักษาดินแดน <span class="block"> Military Studied</span></span></label>
	            			<label class="radio-wrap">
	            				<input name="militstatus" type="radio" value="discharged"> <span class="radio-label ">ผ่านการเกณฑ์แล้ว <span class="block"> Discharged</span></span>
	            			</label>
	            			<label class="radio-wrap">
	            				<input name="militstatus" type="radio" value="other"> <span class="radio-label ">อื่นๆ <span class="block"> Other</span></span></label>
	            		</div>
	            	</div>
            	</div>
            </div>

        </fieldset> 

        <fieldset>
        	<div class="box border-none">
	            <h2 class="title">กลุ่มบริษัท ห้องอาหารสีฟ้า (SEEFAH RESTAURANT GROUP)</h2>
	            <div class="brand-logo">
	            	<h2><span>ใบสมัครงาน </span> (Application Form)</h2>
	            	<span class="brand">
	            	 	<a href="javascript:void(0)"><img src="images/group_logo/{{$groupLogo}}" alt="brand" title=""></a>
	            	</span>
	            </div>
	            <h3><strong>ประวัติการศึกษา Education Background</strong></h3>
			</div>

			<div class="box table-wrapper">
				<div class="table">
					<div class="table-header">
						<ul>
							<li>ระดับการศึกษา Education</li>
							<li>ชื่อสถาบัน Name of Institute</li>
							<li>จาก From</li>
							<li>ถึง To</li>
							<li>จังหวัด/Province</li>
							<li>สาขา/Majority</li>
						</ul>
					</div>
					<div class="table-content">
						<ul class="primary">
							<li>ประถมศึกษา (Primary)</li>
							<li class="inst">
								{{-- <input type="text" name="primary_inst" class="required"> --}} 
								<input type="text" name="primary_inst">
							</li>
							<li class="from">
								<input type="text" name="primary_from" class="date-select xs-input">
							</li>
							<li class="to">
								<input type="text" name="primary_to" class="date-select xs-input">
							</li>
							<li class="country">
								<input type="text" name="primary_province">
								<!-- <select class="sm-input" name="primary_province">
								@foreach($province as $unitprovince)
		            				<option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option>
		            			@endforeach
								</select> -->
							</li>
							<li class="majority">
								<input type="text" class="xs-input" name="primary_majority">
							</li>
						</ul>
						<ul class="secondary">
							<li>มัธยมศึกษา (Secondary)</li>
							<li class="inst"><input type="text" name="secondary_inst"> </li>
							<li class="from"><input type="text" name="secondary_from" class="date-select xs-input"></li>
							<li class="to"><input type="text" name="secondary_to" class="date-select xs-input"></li>
							<li class="country">
								<input type="text" name="secondary_province">
								<!-- <select class="sm-input" name="secondary_province"> -->
								<!-- //@foreach($province as $unitprovince) -->
		            				<!-- <option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option> -->
		            			<!-- //@endforeach -->
								<!-- </select> -->
							</li>
							<li class="majority">
								<input type="text" class="xs-input" name="secondary_majority">
							</li>
						</ul>
						<ul class="vocational">
							<li>อาชีวศึกษา (Vocational)</li>
							<li class="inst"><input name="vocatinal_inst" type="text"> </li>
							<li class="from"><input name="vocatinal_from" type="text" class="date-select xs-input"></li>
							<li class="to"><input name="vocatinal_to" type="text" class="date-select xs-input"></li>
							<li class="country">
								<input type="text" name="vocatinal_province">
								<!-- <select class="sm-input" name="vocatinal_province">
								@foreach($province as $unitprovince)
		            				<option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option>
		            			@endforeach
								</select> -->
							</li>
							<li class="majority"><input name="vocational_majority" type="text" class="xs-input"></li>
						</ul>
						<ul class="hvocational">
							<li>อนุปริญญา (Higher Vocational)</li>
							<li class="inst"><input name="highervocational_inst" type="text"> </li>
							<li class="from"><input name="highervocational_from" type="text" class="date-select xs-input"></li>
							<li class="to"><input name="highervocational_to" type="text" class="date-select xs-input"></li>
							<li class="country">
								<input type="text" name="highervocational_province">
								<!-- <select class="sm-input" name="highervocational_province">
									@foreach($province as $unitprovince)
		            					<option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option>
		            				@endforeach
								</select> -->
							</li>
							<li class="majority"><input name="highervocational_majority" type="text" class="xs-input"></li>
						</ul>
						<ul class="bdegree">
							<li>ปริญญาตรี (Bachelor Degree)</li>
							<li class="inst"><input name="bachelordegree_inst" type="text"> </li>
							<li class="from"><input name="bachelordegree_from" type="text" class="date-select xs-input"></li>
							<li class="to"><input name="bachelordegree_to" type="text" class="date-select xs-input"></li>
							<li class="country">
								<input type="text" name="bachelordegree_province">
								<!-- <select class="sm-input" name="bachelordegree_province">
									@foreach($province as $unitprovince)
			            					<option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option>
			            				@endforeach
								</select> -->
							</li>
							<li class="majority"><input name="bachelordegree_majority" type="text" class="xs-input"></li>
						</ul>
						<ul class="other"> 
							<li>อื่นๆ (Other)</li>
							<li class="inst"><input type="text" name="other_inst"> </li>
							<li class="from"><input type="text" name="other_from" class="date-select xs-input"></li>
							<li class="to"><input type="text" name="other_to" class="date-select xs-input"></li>
							<li class="country">
								<input type="text" name="other_province">
								<!-- <select class="sm-input" name="other_province">
									@foreach($province as $unitprovince)
		            					<option value="{{$unitprovince->province_th}}">{{$unitprovince->province_th}}</option>
		            				@endforeach
								</select> -->
							</li>
							<li class="majority"><input type="text" name="other_majority" class="xs-input"></li>
						</ul>
					</div>
				</div>
				
			</div>

			<div class="box border-none">
				<h3><strong>ภาษา / Language</strong></h3>
			</div>
			<div class="box">
				<h3><strong>ไทย / Thai</strong></h3>
				<div class="form-row">
					<div class="col radio-group">
						<div class="col">
							<strong>การพูด </strong>
						</div>
		    			<label class="radio-wrap ml-10">
		    			<input name="thspeech" checked="checked" type="radio" value="excellent"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="thspeech" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="thspeech" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="thspeech" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
		    		<div class="col radio-group pull-right">
		    			<div class="col">
							<strong>การเขียน </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="thwriting" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="thwriting"  value="good" type="radio"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="thwriting" value="fair" type="radio"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="thwriting" value="no" type="radio"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
	    		</div>
	    		<div class="form-row">
					<div class="col radio-group">
						<div class="col">
							<strong>การอ่าน </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="threading" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="threading" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="threading" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="threading" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
		    		<div class="col radio-group pull-right">
		    			<div class="col">
							<strong>การเข้าใจ </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="thunderstanding" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="thunderstanding" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="thunderstanding" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="thunderstanding" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
	    		</div>
			</div>
			<div class="box">
				<h3><strong>อังกฤษ / English</strong></h3>
				<div class="form-row">
					<div class="col radio-group">
						<div class="col">
							<strong>การพูด </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="enspeech" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="enspeech" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="enspeech" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="enspeech" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
		    		<div class="col radio-group pull-right">
		    			<div class="col">
							<strong>การเขียน </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="enwriting" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="enwriting" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="enwriting" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="enwriting" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
	    		</div>
	    		<div class="form-row">
					<div class="col radio-group">
						<div class="col">
							<strong>การอ่าน </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="enreading" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="enreading" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="enreading" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="enreading" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
		    		<div class="col radio-group pull-right">
		    			<div class="col">
							<strong>การเข้าใจ </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="enunderstanding" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="enunderstanding" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="enunderstanding" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="enunderstanding" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
	    		</div>
			</div>
		
			<div class="box">
				<div class="form-row col">
					<h3 class="col">อื่นๆ / Other</h3>
					<select class="md-input" name="other_language">
						<option value="" selected="selected">Select Language</option>
						@foreach($languages as $language)
							<option value="{{$language->name}}">{{$language->name}}</option>

						@endforeach
					</select>
				</div>
				
				<div class="form-row">
					<div class="col radio-group">
						<div class="col">
							<strong>การพูด  </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="othspeech" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="othspeech" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="othspeech" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="othspeech" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
		    		<div class="col radio-group ml-20 pull-right">
		    			<div class="col">
							<strong>การเขียน </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="othwritting" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="othwritting" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="othwritting" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="othwritting" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
	    		</div>
	    		<div class="form-row">
					<div class="col radio-group">
						<div class="col">
							<strong>การอ่าน </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="othreading" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="othreading" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="othreading" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="othreading" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
		    		<div class="col radio-group ml-20 pull-right">
		    			<div class="col">
							<strong>การเข้าใจ </strong>
						</div>
		    			<label class="radio-wrap ml-10"><input name="othunderstanding" value="excellent" checked="checked" type="radio"> <span class="radio-label "> ดีมาก </span></label>
		    			<label class="radio-wrap ml-10"><input name="othunderstanding" type="radio" value="good"> <span class="radio-label ">ดี </span></label>
		    			<label class="radio-wrap ml-10"><input name="othunderstanding" type="radio" value="fair"> <span class="radio-label ">พอใช้ </span></label>
		    			<label class="radio-wrap ml-10"><input name="othunderstanding" type="radio" value="no"> <span class="radio-label ">ไม่มี </span></label>
		    		</div>
	    		</div>
			</div>

        </fieldset>

        <fieldset class="form-horizontal" role="form">

        	<div class="box border-none">
	            <h2 class="title">กลุ่มบริษัท ห้องอาหารสีฟ้า (SEEFAH RESTAURANT GROUP)</h2>
	            <div class="brand-logo">
	            	<h2><span>ใบสมัครงาน </span> (Application Form)</h2>
	            	<span class="brand">
	            	 	<a href="javascript:void(0)"><img src="images/group_logo/{{$groupLogo}}" alt="brand" title=""></a>
	            	</span>
	            </div>
	            <h3>ประวัติการทำงาน Employment History</h3>
			</div>

			<div class="box" >
				<div class="form-row">
					<div class="col">
	            		<div class="col">
	            			<label>ชื่อสถานประกอบการ<span class="block">Name of Employed</span> </label>
	            		</div>
	            		<input class="sm-input" name="employed_name[]" type="text">
	            	</div>
	        		<div class="col">
	            		<div class="col">
	            			<label>จาก From  </label>
	            		</div>
	            		<input class="sm-input date-select" name="employment_from[]" type="text">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>ถึง To </label>
	            		</div>
	            		<input class="sm-input date-select" name="employment_to[]" type="text">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>ตำแหน่ง <span class="block">Position</span> </label>
	            		</div>
	            		<input class="sm-input" name="employment_position[]" type="text">
	            	</div>
	            </div>  
	            <div class="form-row">
	            	<div class="col">
	            		<div class="col">
	            			<label>ลักษณะงานโดยสังเขป <span class="block">Job Description</span> </label>
	            		</div>
	            		<input type="text" name="employment_desc[]" class="md-input" aria-required="true">
	            	</div>
	            	<div class="col">
	            		<div class="col">
	            			<label>เงินเดือนครั้งสุดท้าย <span class="block">Lasted Salary</span> </label>
	            		</div>
	            		<div class="col">
	            		<input type="text" name="employment_lsal[]" class="md-input numValidate">
	            		</div>
	            		<div class="col">
	            			<label>บาท <span class="block">Baht</span> </label>
	            		</div>
	            	</div>
        		</div>         
        	</div>
        	<div id="employment_div"></div>
        	<div class="box border-none">
        		<button class="btn mb-15" type="button" id="emphis"> + Employment History </button>
        		<h3>บุคคลที่ไม่ใช่ญาติซึ่งทราบประวัติของท่านและบริษัทฯ สามารถสอบถามได้
					<span class="block">Personal other than relatives can be contacted</span>
        		</h3>        		
        	</div>

        	<div class="box-group">
        		<div class="box">
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ชื่อ - สกุล <span class="block">Name</span> </label>
		            		</div>
		            		<input name="nonrelative_name" class="md-input" type="text" required="required">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>ความสัมพันธ์ <span class="block">Relationship</span> </label>
		            		</div>
		            		<input name="nonrelative_relation" class="sm-input" type="text" required="required">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>สถานที่ทำงาน/ที่อยู่ <span class="block">Firm Address</span> </label>
		            		</div>
		            		<div class="col"> 
		            			<input name="nonrelative_address" type="text" class="sm-input" required="required">
		            		</div>		            		
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ตำแหน่ง <span class="block">Position</span> </label>
		            		</div>
		            		<input class="sm-input" type="text" name="nonrelative_position" required="required">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>โทรศัพท์ <span class="block">Telephone</span> </label>
		            		</div>
		            		<input class="sm-input removeNonDigits" name="nonrelative_telephone" type="text" required="required">
		            	</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="row">
            			<div class="col pull-left ml-15">
            				<label>ความรู้พิเศษ / Special skill</label>
            			</div>
            			<div class="col-sm-9">
            				<div class="form-row">
            					<div class="col radio-labelgroup check-group">
            						<label class="check-wrap mr-20">
            							<input name="special_skill[]" type="checkbox" value="Computer"> <span class="chk-label ">คอมพิวเตอร์ <span class="block">Computer</span></span>
            						</label>
			            			<label class="check-wrap mr-20">
			            				<input name="special_skill[]" type="checkbox" value="Fax"> <span class="chk-label ">เครื่องโทรสาร<span class="block">Fax</span></span>
			            			</label>
			            			<label class="check-wrap mr-20">
			            				<input name="special_skill[]" type="checkbox" value="Driver"> <span class="chk-label ">ขับรถ <span class="block">Driver</span></span>
			            			</label>			            			
			            		</div>
            				</div>	
            				<div class="form-row">
            					<div class="col radio-labelgroup">
			            			<label class="check-wrap mr-20 inline"><input name="special_skill[]" type="checkbox" value="Other"> <span class="chk-label ">อื่นๆ <span class="block"> Other</span></span></label>
			            			<div class="col">
			            				<input name="skill_other" type="text" class="lg-input">
			            			</div>		            			
			            		</div>
            				</div>
            			</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="row">
            			<div class="col-sm-7">
            				<h3 class="mb-5">ในตำแหน่งงานที่ท่านทำต้องมีการค้ำประกัน <span class="block">Can you provide a guarantor ?</span></h3>
            			</div>
            			<div class="col-sm-2">
            				<div class="col radio-labelgroup">
		            			<label class="radio-wrap "><input name="guarantor" checked="checked" type="radio" value="yes"> <span class="radio-label ">ไม่ขัดข้อง <span class="block"> Yes</span></span></label>            		            
		            		</div>
            			</div>
            			<div class="col-sm-3">
            				<div class="col radio-labelgroup">			            	
		            			<label class="radio-wrap "><input name="guarantor" type="radio" value="no"> <span class="radio-label ">ขัดข้อง <span class="block"> No</span></span></label>		            						            			
		            		</div>
            			</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="row">
            			<div class="col-sm-7">
            				<h3 class="mb-5">ในการปฎิบัติงานที่เป็นกะหมุนเวียนกันไป <span class="block">Can you work shift by shift ?</span></h3>
            			</div>
            			<div class="col-sm-2">
            				<div class="col radio-labelgroup">
		            			<label class="radio-wrap "><input name="work_shift" checked="checked" type="radio" value="yes"> <span class="radio-label ">ไม่ขัดข้อง <span class="block"> Yes</span></span></label>            		            
		            		</div>
            			</div>
            			<div class="col-sm-3">
            				<div class="col radio-labelgroup">			            	
		            			<label class="radio-wrap "><input name="work_shift" type="radio" value="no"> <span class="radio-label ">ขัดข้อง <span class="block"> No</span></span></label>		            						            			
		            		</div>
            			</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="row">
            			<div class="col-sm-7">
            				<h3 class="mb-5">ในการปฎิบัติงาน สามารถเปลี่ยนแปลงตำแหน่งหน้าที่ได้ตามความเหมาะสม <span class="block">Can you Rotate your working position ?</span></h3>
            			</div>
            			<div class="col-sm-2">
            				<div class="col radio-labelgroup">
		            			<label class="radio-wrap "><input name="rotatework" checked="checked" type="radio" value="yes"> <span class="radio-label ">ไม่ขัดข้อง <span class="block"> Yes</span></span></label>            		            
		            		</div>
            			</div>
            			<div class="col-sm-3">
            				<div class="col radio-labelgroup">			            	
		            			<label class="radio-wrap "><input name="rotatework" type="radio" value="no"> <span class="radio-label ">ขัดข้อง <span class="block"> No</span></span></label>		            						            			
		            		</div>
            			</div>
            		</div>
            	</div>
            	<div class="box">
            		<div class="form-row">
	            		<div class="col">
		            		<div class="col">
		            			<label>บุคคลที่ท่านรู้จักในบริษัทฯคือ <span class="block">Relatives or Friends working in this</span> </label>
		            		</div>
		            		<input class="md-input" type="text" name="friend_working">
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>ความสัมพันธ์ <span class="block">Relationship</span> </label>
		            		</div>
		            		<input class="md-input" type="text" name="friend_working_relationship" >
		            	</div>
            		</div>
            		<div class="form-row">
            			<div class="col">
		            		<div class="col">
		            			<label>ท่านพร้อมที่จะเริ่มงานกับทางบริษัทได้ในวันที่ <span class="block">Date avaliable to start work</span></label>
		            		</div>
		            		<input class="date-select xs-input" name="joining_date" type="text">
		            	</div>
            		</div>
            		<div class="form-row">
	            		<div class="col">
		            		<div class="col">
		            			<label>กรณีเกิดเหตุฉุกเฉินสามารถติดต่อ <span class="block">Persons to be notified in case of emergency</span> </label>
		            		</div>
		            		<input class="md-input" name="emergency_contact" type="text" required>
		            	</div>
		            	<div class="col">
		            		<div class="col">
		            			<label>โทรศัพท์ <span class="block">Telephone</span>  </label>
		            		</div>
		            		<input class="md-input removeNonDigits" name="emergency_call" type="tel" required>
		            	</div>
            		</div>
            	</div>
            	<div class="box border-none desc"> 
					<h3>ภาพถ่ายผู้สมัครงาน  / Job Seeker Photo</h3>
					<div class="file-wrapper">
						<div class="file-name"></div>
						<span id="image_crop" class="btn">Upload Image</span>
						<!--<input type="file" name="applicant_pic" accept="image/*">
						{{-- <input type="file" name="applicant_pic" required="required" accept="image/*"> --}}
						<button type="button" class="btn">Choose File</button>-->
					</div>
					<div id="myModal" class="modal fade bs-example-modal-lg">
						
						<div class="modal-dialog modal-lg">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									<h4 class="modal-title">Cahange</h4>
								</div>
								<div class="modal-body">
									
									<div class="container">
									<div class="row">
									<div class="col-md-9">
									<!-- <h3>Demo:</h3> -->
									<div class="img-container">
									<img id="image" src="images/download.jpeg" alt="Picture">
									</div>
									</div>
									<div class="col-md-3">
									<!-- <h3>Preview:</h3> -->
									<div class="docs-preview clearfix">
									<div class="img-preview preview-lg"></div>

									</div>

									</div>
									</div>
									<div class="row">
									<div class="col-md-9 docs-buttons">
									<!-- <h3>Toolbar:</h3> -->
									<div class="btn-group">
									<button type="button" class="btn btn-primary" data-method="setDragMode" data-option="move" title="Move">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;setDragMode&quot;, &quot;move&quot;)">
									  <span class="fa fa-arrows"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;setDragMode&quot;, &quot;crop&quot;)">
									  <span class="fa fa-crop"></span>
									</span>
									</button>
									</div>

									<div class="btn-group">
									<button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;zoom&quot;, 0.1)">
									  <span class="fa fa-search-plus"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;zoom&quot;, -0.1)">
									  <span class="fa fa-search-minus"></span>
									</span>
									</button>
									</div>

									<div class="btn-group">
									<button type="button" class="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;move&quot;, -10, 0)">
									  <span class="fa fa-arrow-left"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;move&quot;, 10, 0)">
									  <span class="fa fa-arrow-right"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;move&quot;, 0, -10)">
									  <span class="fa fa-arrow-up"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;move&quot;, 0, 10)">
									  <span class="fa fa-arrow-down"></span>
									</span>
									</button>
									</div>

									<div class="btn-group">
									<button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;rotate&quot;, -45)">
									  <span class="fa fa-rotate-left"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;rotate&quot;, 45)">
									  <span class="fa fa-rotate-right"></span>
									</span>
									</button>
									</div>

									<div class="btn-group">
									<button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;scaleX&quot;, -1)">
									  <span class="fa fa-arrows-h"></span>
									</span>
									</button>
									<button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical">
									<span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;scaleY&quot;, -1)">
									  <span class="fa fa-arrows-v"></span>
									</span>
									</button>
									</div>


									<!-- Show the cropped image in modal -->
									<div class="modal fade docs-cropped" id="getCroppedCanvasModal" aria-hidden="true" aria-labelledby="getCroppedCanvasTitle" role="dialog" tabindex="-1">
									<div class="modal-dialog">
									<div class="modal-content">
									  <div class="modal-header">
									    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
									    <h4 class="modal-title" id="getCroppedCanvasTitle">Cropped</h4>
									  </div>
									  <div class="modal-body"></div>
									  <div class="modal-footer">
									    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
									    <a class="btn btn-primary" id="download" href="javascript:void(0);" download="cropped.jpg">Download</a>
									  </div>
									</div>
									</div>
									</div>



									</div>


									</div>
									</div>

								</div>
								
							</div>
						</div>
					</div>
					<p>ข้าพเจ้าขอรับรองว่าข้อความข้างต้นทั้งหมดนี้เป็นความจริงทุกประการ หากข้อความตอนใดไม่ตรงกับความจริงนนั้น ข้าพเจ้าขอยอมรับว่าการว่าจ้างที่ตกลงนั้นถือเป็นโมฆะและสิ้นสุดทันที</p>
					<p>Certify that all of the statements in this application are true and correct to the best of my knowledgeand any false information wilfully given shall be sufficient reason to dismiss me  from the service.</p>
					 <button id="SaveAccount" type="submit" class="btn btn-primary submit">Submit </button>
            	</div>

        	</div>

    	</fieldset>       
    </form>
</div>
@endsection
@section('footer_scripts')
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" ></script>
	<script type="text/javascript" src="{{asset('js/jquery.formtowizard.js')}}"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.0/jquery.validate.min.js"></script>
	<script type="text/javascript" src="{{asset('js/custom.js')}}"></script>

	
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" ></script>

	<script src="https://fengyuanchen.github.io/js/common.js"></script>
  	<script src={{asset('js/crop_dist/cropper.js')}}></script>
  	<script src="{{asset('js/crop_dist/main.js')}}"></script>

	    <script type="text/javascript">
	        $( function() {
	            var $signupForm	 = $( '#SignupForm' );	            
	            $signupForm.validate({
	                errorElement: 'em',
	                submitHandler: function (form) { 
	                    //alert('submitted');
	                    form.submit();
	                }
	            });
	            
	            $signupForm.formToWizard({
	                submitButton: 'SaveAccount',
	                nextBtnClass: 'btn btn-primary next',
	                prevBtnClass: 'btn btn-default prev',
	                buttonTag:    'button',
	                validateBeforeNext: function(form, step) {
	                    var stepIsValid = true;
	                    var validator = form.validate();
	                    $(':input', step).each( function(index) {

	                        var xy = validator.element(this);
	                        stepIsValid = stepIsValid && (typeof xy == 'undefined' || xy);
	                    });
	                    return stepIsValid;
	                },
	                progress: function (i, count) {
	                	var j = i+1;
	                	var k = i+2;
	                	window.scrollTo(0,0);
	                	$("#stepDesc"+i).addClass("current");
	                	$("#stepDesc"+j).removeClass('current');
	                	$("#stepDesc"+k).removeClass('current');
	                	$('#progress-complete').width(''+(i/count*100)+'%');
	                }
	            });
	        });
	    </script>
	    <script type="text/javascript" src="{{asset('js/bootstrap-datepicker.js')}}"></script>
		<script type="text/javascript">
			$(function($){
				 $('.date-select').datepicker({
					 format: 'dd-mm-yyyy',
			     	 todayBtn: 'linked',
			     }).on('changeDate', function(e) {
			     	$(this).datepicker('hide');
			     	if($(this).attr('data-attr')==='dateofbirth'){
			     		console.log($(this).val());
			     		let d= $(this).val(); 
			     		setTimeout(function(){
			     			console.log("date :"+new Date(d));
			     		},140)
			     		
			     		//console.log(e.target.value);
			     		// console.log(getAge());
			     		//getAge(e.target.value)
			     		//console.log($(this).datepicker('date'));
			     	}
		     	
       				 // `e` here contains the extra attributes
   				 });
   				 //  var newDate = $('.date-select').datepicker('getDate');
   				 // $('.date-select').datepicker('setDate', newDate).datepicker('option', 'minDate', newDate);
		   });
		</script>  
		
		<script type="text/javascript">
			$(function($){

				$("#image_crop").on("click", function(){
					$("#myModal").modal('show');
				});
				 
		   });
		</script>
@endsection
